Rails.application.routes.draw do
  namespace :v1 do
    mount_devise_token_auth_for 'User', at: 'auth'
    get '/users/:userName', to: 'users#show'
    get '/posts', to: 'posts#index'
  end
  get '/health_check', to: 'health_check#index'
end
