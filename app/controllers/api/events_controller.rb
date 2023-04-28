class Api::EventsController < ApplicationController
    before_action :set_event, only: %i[show update destroy]

    def index
      @events = Event.all
      render json: @events
    end

    def show
      render json: @event
    end

    def create
      @event = Event.new(event_params)

      if @event.save
        render json: @event, status: :created
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    def update
      if @event.update(event_params)
        render json: @event, status: :ok
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
    end

    private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(

         #paramsはRailsが提供してくれているメソッドで、この中にフロントから送られてくるデータ（ここでは、idやevent_typeなど）が格納されています。
        #このrequireはeventというキーに対応するものをとってきて
        #permitで指定されている(id,event_typeなどの)キーのついた値だけを取得する。こうすることでセキュリティを保護することができる。
        :id,
        :event_type,
        :event_date,
        :title,
        :speaker,
        :host,
        :published,
        :created_at,
        :updated_at
      )
    end
  end