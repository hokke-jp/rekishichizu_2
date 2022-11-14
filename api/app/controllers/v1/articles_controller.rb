class V1::ArticlesController < ApplicationController
  before_action :authenticate_v1_user!, only: %i[create destroy]

  def index
    # if params[:sort_by] == 'likes_count DESC'
    #   # binding.pry
    #   return render json: [] if params[:page].to_i > 1

    #   articles = Article.customised_articles.ransack(s: 'likes_count DESC').result.limit(4)
    #   return render json: articles
    # end
    articles = params[:page].present? ? Article.customised_articles.ransack(search_query).result.page(params[:page]) : Article.customised_articles.ransack(search_query).result
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

  def words_query
    tmp = {}
    string_to_array(params[:words], to_num: false).each_with_index do |word, index|
      tmp.store(index.to_s, {
                  'a' => { '0' => { 'name' => 'title' }, '1' => { 'name' => 'content' }, '2' => { 'name' => 'user_name' } },
                  'p' => 'cont',
                  'v' => { '0' => { 'value' => word } },
                  'm' => 'or'
                })
    end
    tmp
  end

  def sort_name
    params[:sort_by].present? ? params[:sort_by].split[0] : 'created_at'
  end

  def sort_direction
    params[:sort_by].present? ? params[:sort_by].split[1] : 'DESC'
  end

  def search_query
    # 単語 + 時代タグ + 都道府県タグ + ID + ソート 検索をRansackでするためのquery
    {
      # ソート検索
      's' => {
        '0' => { 'name' => sort_name,
                 'dir' => sort_direction }
      },
      'g' => {
        # 単語検索 単語同士はAND条件
        '0' => {
          'c' => {
            **words_query
          }
        },
        # 時代検索 時代同士はOR条件
        '1' => { 'period_id_eq_any' => string_to_array(params[:period_ids]) },
        # 都道府県検索 都道府県同士はOR条件
        '2' => { 'prefecture_id_eq_any' => string_to_array(params[:prefecture_ids]) },
        # ID指定
        '3' => { 'id_eq_any' => string_to_array(params[:ids]) }
      },
      # 単語・時代・都道府県・IDはAND条件
      'm' => 'and'
    }
  end
end
