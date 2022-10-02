Rails.application.routes.draw do
  namespace :v1, format: 'json' do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      token_validations: 'overrides/token_validations',
      registrations: 'overrides/registrations',
      sessions: 'overrides/sessions'
    }
    get '/users/:userName', to: 'users#show'
    get '/articles', to: 'articles#index'
    post '/articles', to: 'articles#create'
    get '/article', to: 'articles#show'
    get '/posts', to: 'posts#index'
  end
  get '/health_check', to: 'health_check#index'
end
