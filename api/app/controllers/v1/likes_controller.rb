class V1::LikesController < ApplicationController
  before_action :authenticate_v1_user!

  def create
    article = Article.find(params[:article_id])
    current_v1_user.like(article)
    render json: { new_liked_user_ids: Article.find_by(id: article.id).liked_user_ids, new_liking_article_ids: current_v1_user.liking_article_ids }
  end

  def destroy
    article = Article.find(params[:id])
    current_v1_user.unlike(article)
    render json: { new_liked_user_ids: Article.find_by(id: article.id).liked_user_ids, new_liking_article_ids: current_v1_user.liking_article_ids }
  end
end
