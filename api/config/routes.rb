Rails.application.routes.draw do
  get '/health_check', to: 'health_check#index'
  get '/posts', to: 'posts#index'
end
