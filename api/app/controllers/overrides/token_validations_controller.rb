module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    def validate_token
      if @resource
        yield @resource if block_given?
        render json: @resource, methods: [:avatar_url]
      else
        render json: {
          success: false,
          errors: ['Invalid login credentials']
        }, status: 401
      end
    end
  end
end
