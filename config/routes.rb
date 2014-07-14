GBooks::Application.routes.draw do

  root :to => 'sessions#index'

  get "books", :to => "books#index"

  resources :books

  match 'start'  => 'sessions#index', :via => :get
  match 'logout' => 'sessions#destroy', :via => [:get, :delete]
  match 'signup' => 'users#new', :via => :get

  resource :session, :only => [:new, :create, :destroy]
  resource :account, :controller => 'users', :except => [:index, :destroy, :show, :edit]

  resources :announcements

  post "/announcements/:id", :to => "announcements#create"
  get "/announcements/:id", :to => "announcements#show"

end
