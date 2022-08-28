Rails.application.routes.draw do
  namespace :v1 do
    mount_devise_token_auth_for 'User', at: 'auth'
    get '/posts', to: 'posts#index'
  end
  get '/health_check', to: 'health_check#index'
end
