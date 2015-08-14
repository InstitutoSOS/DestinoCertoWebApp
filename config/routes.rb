Rails.application.routes.draw do
  root 'pages#index'

  get '/material/:material', to: 'pages#results'

  get '/sobre', to: 'pages#about'
  get '/estatisticas', to: 'pages#statistics'
end
