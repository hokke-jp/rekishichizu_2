module Overrides
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    def update
      if @resource
        if @resource.send(resource_update_method, account_update_params)
          yield @resource if block_given?
          render json: @resource, methods: [:avatar_url]
        else
          render_update_error
        end
      else
        render_update_error_user_not_found
      end
    end
  end
end
