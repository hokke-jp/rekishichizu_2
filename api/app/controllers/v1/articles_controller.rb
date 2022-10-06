module V1
  class ArticlesController < ApplicationController
    before_action :authenticate_v1_user!, only: %i[show create]
    def index
      articles = Article.with_attached_image.includes(:liked_user, user: { avatar_attachment: :blob })
      # articles = Article.all.includes(image_attachment: :blob, user: :avatar_attachment)
      render json: articles
    end

    def show
      article = Article.first
      render json: article
    end

    def create
      article = current_v1_user.articles.build(article_params)
      if article.save
        article.image.attach(params[:image]) if params[:image].present?
        head :created
      else
        render json: { errors: article.errors.full_messages }, status: 404
      end
    end

    private

    def article_params
      params.permit(:title, :content, :lat, :lng, :period_id, :prefecture_id)
    end
  end
end
