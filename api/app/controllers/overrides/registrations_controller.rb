module Overrides
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    def update
      if @resource
        if @resource.send(resource_update_method, account_update_params)
          yield @resource if block_given?

          if account_update_params.key?(:introduction)
            return unless @resource.introduction

            @resource.introduction.strip_zenkaku!
            @resource.save
          end
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

# methods: [:avatar_url] と, strip_zenkaku! validation を入れるためにオーバーライド
# その他はデフォルトのまま
