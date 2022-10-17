module V1
  class RelationshipsController < ApplicationController
    before_action :authenticate_v1_user!

    def create
      user = User.find(params[:followed_id])
      current_v1_user.follow(user)
      render json: { new_following_ids: current_v1_user.following_ids }
    end

    def destroy
      user = User.find(params[:id])
      current_v1_user.unfollow(user)
      render json: { new_following_ids: current_v1_user.following_ids }
    end
  end
end
