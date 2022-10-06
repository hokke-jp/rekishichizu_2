module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      render json: {
        data: resource_data(resource_json: @resource.token_validation_response).merge(avatar_url: current_v1_user.avatar_url,
                                                                                      liking_article_ids: current_v1_user.liking_article_ids,
                                                                                      following_ids: current_v1_user.following_ids)
      }
    end
  end
end

# .merge(avatar_url: current_v1_user.avatar_url) を入れるためにオーバーライド
# その他はデフォルトのまま
