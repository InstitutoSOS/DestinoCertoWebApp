Rails.application.routes.draw do
  root 'pages#index'

  get  '/material/:material', to: 'pages#results'
  get  '/cadastro',  to: 'pages#signup'
end
