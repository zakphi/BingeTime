Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  get '/profile' => 'users#profile'
  post '/search' => 'tv_shows#search'

  resources :users
  resources :tv_shows
end
