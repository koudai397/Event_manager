Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
  # こうすることでこのルーティングは、/api/eventsのようなURLでアクセスできるようになります
  # onlyオプションで指定したアクションのみ利用可能にしている。
end
