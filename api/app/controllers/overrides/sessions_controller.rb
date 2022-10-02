module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      render json: {
        data: resource_data(resource_json: @resource.token_validation_response)
      }
    end
  end
end

# methods: [:avatar_url] を入れるためにオーバーライド
# その他はデフォルトのまま
