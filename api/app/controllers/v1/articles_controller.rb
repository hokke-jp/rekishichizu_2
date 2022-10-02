module V1
  class ArticlesController < ApplicationController
    before_action :authenticate_v1_user!, only: %i[show create]
    def index
      articles = Article.all
      render json: current_v1_user
    end

    def show
      article = Article.first
      render json: current_v1_user
    end

    def create
      # binding.pry
      article = current_v1_user.articles.build(article_params)
      if article.save
        # binding.pry
        render json: {article: article}
      else
        render json: {error: article.errors.full_messages}, status: 404
      end
    end

    private

      def article_params
        params.require(:article)
              .permit(:title, :content, :period_id, :prefecture_id, :lat, :lng)
      end
  end
end
