module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      render json: {
        data: resource_data(resource_json: @resource.token_validation_response).merge(avatar_url: current_v1_user.avatar_url)
      }
    end
  end
end

# .merge(avatar_url: current_v1_user.avatar_url) を入れるためにオーバーライド
# その他はデフォルトのまま
