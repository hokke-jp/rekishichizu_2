module V1
  class ArticlesController < ApplicationController
    before_action :authenticate_v1_user!, only: %i[create destroy]
    def index
      # binding.pry
      if includes_query?
        articles = Article.customised_articles.where(id: params_ids)
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
      !!params[:ids] || !!params[:period_id] || !!params[:prefecture_id]
    end

    def params_ids
      params[:ids].split(',').map(&:to_i)
    end
  end
end
