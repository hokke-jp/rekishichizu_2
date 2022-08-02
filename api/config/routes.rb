Rails.application.routes.draw do
  root 'posts#root'
  get '/posts', to: 'posts#index'
end
