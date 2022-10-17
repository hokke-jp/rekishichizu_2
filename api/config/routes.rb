Rails.application.routes.draw do
  get 'likes/create'
  get 'likes/destroy'
  namespace :v1, format: 'json' do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      token_validations: 'overrides/token_validations',
      registrations: 'overrides/registrations',
      sessions: 'overrides/sessions'
    }
    get '/users', to: 'users#index'
    get '/users/:user_name', to: 'users#show'
    resources :articles, only: %i[index create destroy]
    resources :likes, only: %i[create destroy]
    resources :relationships, only: %i[create destroy]
  end
  get '/health_check', to: 'health_check#index'
end
