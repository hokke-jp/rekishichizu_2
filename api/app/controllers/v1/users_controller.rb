module V1
  class UsersController < ApplicationController
    def index
      if includes_query?
        users = User.includes(avatar_attachment: :blob).select(:id, :name).where(id: params_ids)
        return render json: {users: users}, methods: [:avatar_url]
      end
      # users = User.all
      # render json: users
    end

    def show
      user = User.find_by(name: params[:user_name])
      render json: user, methods: [:avatar_url]
    end

    private

    def includes_query?
      !!params[:ids]
    end

    def params_ids
      params[:ids].split(',').map(&:to_i)
    end
  end
end
