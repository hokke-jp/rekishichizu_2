module V1
  class UsersController < ApplicationController
    def show
      user = User.find_by(name: params[:userName])
      render json: user, methods: [:avatar_url] 
    end
  end
end
