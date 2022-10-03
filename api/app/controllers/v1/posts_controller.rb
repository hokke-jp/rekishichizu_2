module V1
  class PostsController < ApplicationController
    def index
      articles = Article.all
      render json: articles
    end
  end
end
