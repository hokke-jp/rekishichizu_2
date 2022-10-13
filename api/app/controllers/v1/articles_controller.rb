module V1
  class ArticlesController < ApplicationController
    before_action :authenticate_v1_user!, only: %i[create destroy]

    def index
      if includes_query?
        if params[:sort_by].present?
          q = { s: params[:sort_by], 'id_eq_any' => convert_into_array(params[:ids], to_num: true) }
          articles = Article.customised_articles.ransack(q).result
          return render json: articles
        end
        articles = Article.customised_articles.ransack(search_q).result
        return render json: articles
      end
      articles = Article.customised_articles
      render json: articles
    end

    def create
      article = current_v1_user.articles.build(article_params)
      if article.save
        article.image.attach(params[:image]) if params[:image].present?
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

      def includes_query?
        !!params[:ids] || !!params[:period_ids] || !!params[:prefecture_ids] || !!params[:words] || !!params[:sort_by]
      end

      def convert_into_array(string_params, to_num: false)
        return [] if string_params.blank?

        res = string_params.split(',')
        res.map!(&:to_i) if to_num
        res
      end

      def search_q
        q_words = {}
        convert_into_array(params[:words]).each_with_index do |word, index|
          q_words.store(index.to_s, {
                          'a' => { '0' => { 'name' => 'title' }, '1' => { 'name' => 'content' }, '2' => { 'name' => 'user_name' } },
                          'p' => 'cont',
                          'v' => { '0' => { 'value' => word } },
                          'm' => 'or'
                        })
        end
        {
          'g' => {
            '0' => {
              'c' => {
                **q_words
              }
            },
            '1' => { 'period_id_eq_any' => convert_into_array(params[:period_ids], to_num: true) },
            '2' => { 'prefecture_id_eq_any' => convert_into_array(params[:prefecture_ids], to_num: true) },
            '3' => { 'id_eq_any' => convert_into_array(params[:ids], to_num: true) }
          },
          'm' => 'and'
        }
      end
  end
end
