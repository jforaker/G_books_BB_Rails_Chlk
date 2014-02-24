GBooks::Application.routes.draw do
  root :to => 'books#index'
  get "index", :to => "books#index"
  resources :books

end
