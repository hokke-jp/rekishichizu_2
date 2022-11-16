class V1::UsersController < ApplicationController
  def index
    return unless includes_query?

    users = User.includes(avatar_attachment: :blob).select(:id, :name).where(id: params_ids)
    render json: { users: }, methods: [:avatar_url]
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
