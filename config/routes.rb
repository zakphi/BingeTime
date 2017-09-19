Rails.application.routes.draw do
  root to: 'root#index'

  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  get '/profile' => 'users#profile'
  post '/search' => 'tv_shows#search'
  get '/config' => 'tv_shows#img_config'

  resources :users
  resources :tv_shows
end
