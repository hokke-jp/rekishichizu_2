module V1
  class ArticlesController < ApplicationController
    before_action :authenticate_v1_user!, only: %i[create destroy]

    def index
      articles = params[:page].present? ? Article.customised_articles.ransack(search_q).result.page(params[:page]) : Article.customised_articles.ransack(search_q).result
      render json: articles
    end

    def create
      article = current_v1_user.articles.build(article_params)
      article.image.attach(params[:image]) if params[:image].present?
      if article.save
        render json: { article_ids: current_v1_user.article_ids }, status: :created
      else
        render json: { errors: article.errors.full_messages }, status: 404
      end
    end

    def destroy
      Article.find_by(id: params[:id]).destroy
      render json: { article_ids: current_v1_user.article_ids }
    end

    private

      def article_params
        params.permit(:title, :content, :lat, :lng, :period_id, :prefecture_id)
      end

      def string_to_array(string_params, to_num: true)
        return [] if string_params.blank?

        res = string_params.split(',')
        res.map!(&:to_i) if to_num
        res
      end

      def search_q
        q_words = {}
        string_to_array(params[:words], to_num: false).each_with_index do |word, index|
          q_words.store(index.to_s, {
                          'a' => { '0' => { 'name' => 'title' }, '1' => { 'name' => 'content' }, '2' => { 'name' => 'user_name' } },
                          'p' => 'cont',
                          'v' => { '0' => { 'value' => word } },
                          'm' => 'or'
                        })
        end
        sort_name = params[:sort_by].present? ? params[:sort_by].split[0] : 'created_at'
        sort_dir = params[:sort_by].present? ? params[:sort_by].split[1] : 'DESC'
        {
          's' => {
            '0' => { 'name' => sort_name,
                     'dir' => sort_dir }
          },
          'g' => {
            '0' => {
              'c' => {
                **q_words
              }
            },
            '1' => { 'period_id_eq_any' => string_to_array(params[:period_ids]) },
            '2' => { 'prefecture_id_eq_any' => string_to_array(params[:prefecture_ids]) },
            '3' => { 'id_eq_any' => string_to_array(params[:ids]) }
          },
          'm' => 'and'
        }
      end
  end
end
