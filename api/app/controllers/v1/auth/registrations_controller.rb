module V1
  module Auth
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      def update
        super
        if account_update_params[:avatar].present?
          resource.avatar.attach(account_update_params[:avatar])
        end
      end
    end
  end
end
