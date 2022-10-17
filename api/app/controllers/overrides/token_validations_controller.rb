module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    def validate_token
      if @resource
        yield @resource if block_given?
        render json: @resource, methods: %i[avatar_url liking_article_ids following_ids]
      else
        render json: {
          success: false,
          errors: ['Invalid login credentials']
        }, status: 401
      end
    end
  end
end

# methods: [:avatar_url...] を追加するためにオーバーライド
# その他はデフォルトのまま
