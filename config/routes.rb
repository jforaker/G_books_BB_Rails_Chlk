GBooks::Application.routes.draw do
  #get "home/index"
  root :to => 'sessions#index'

  #get '/index' => 'sessions#create'
  #get '/signin' => 'sessions#new', :as => :signin
  #get '/signout' => 'sessions#destroy', :as => :signout
  #get '/auth/failure' => 'sessions#failure'

  get "books", :to => "books#index"


  resources :books




  match 'start'  => 'sessions#index', :via => :get
  match 'logout' => 'sessions#destroy', :via => [:get, :delete]
  match 'signup' => 'users#new', :via => :get

  resource :session, :only => [:new, :create, :destroy]
  resource :account, :controller => 'users', :except => [:index, :destroy, :show, :edit]


end
