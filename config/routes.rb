Rails.application.routes.draw do
  root 'pages#index'

  get  '/resultado/:material', to: 'pages#results'
  post '/resultado', to: 'pages#results'
  get  '/cadastro',  to: 'pages#signup'
end
