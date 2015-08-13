Rails.application.routes.draw do
  root 'pages#index'

  get '/resultado', to: 'pages#results'
  get '/cadastro',  to: 'pages#signup'
end
