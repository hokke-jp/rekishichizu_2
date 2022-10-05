module V1
  class LikesController < ApplicationController
    before_action :authenticate_v1_user!

    def create
      article_id = params[:article_id]
      Like.create(user_id: current_v1_user.id, article_id:)
      render json: { new_liked_user_ids: Article.find_by(id: article_id).liked_user_ids, new_liking_article_ids: current_v1_user.liking_article_ids }
    end

    def destroy
      article_id = params[:id]
      Like.find_by(user_id: current_v1_user.id, article_id:).destroy
      render json: { new_liked_user_ids: Article.find_by(id: article_id).liked_user_ids, new_liking_article_ids: current_v1_user.liking_article_ids }
    end
  end
end
