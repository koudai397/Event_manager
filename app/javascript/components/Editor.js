import React, { useState, useEffect } from "react";
import Header from "./Header";
import EventList from "./EventList";
import { Routes, Route, useNavigate } from "react-router-dom";
import Event from "./Event";
import EventForm from "./EventForm";
import { success } from "../helpers/notifications";
import { handleAjaxError } from "../helpers/helpers";

const Editor = () => {
  const [events, setEvents] = useState([]);
  //このeventsには配列が入っており、それをuseStateを使って初期化している
  const [isLoading, setIsLoading] = useState(true);
  //この変数には真偽値が入っているのだが、レンダリングされるたびにtrueで初期化される。
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/events");
        //fetchメソッドはデフォルトでGETメソッドを送信する。ここではapi/eventsにgetメソッドを送っている。
        if (!response.ok) throw Error(response.statusText);
        //responseがokだったら下のsetEventsの処理を実施。それ(200台)以外だったら、Error()を実行する。
        //例えば404だとNot Foundとなり、下のcatchが実行される。
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        handleAjaxError(error);
      }
      //上のfetchDateの処理が終わってから実行される。falseにすることでデータの取得が終わったことを表す。
      setIsLoading(false);
    };

    fetchData();
    //定義したものを実行している
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // postメソッドを送っており、JSON形式で
      if (!response.ok) throw Error(response.statusText);
      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      // setEventsの配列に新しい要素を追加している
      success("Event Added!");
      navigate(`/events/${savedEvent.id}`);
      // 保存したイベントの詳細ページに遷移している。
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteEvent = async (eventId) => {
    const sure = window.confirm("Are you sure?");

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        });
        // ここで指定されたidのイベントを削除する

        if (!response.ok) throw Error(response.statusText);

        success("Event Deleted!");
        navigate("/events");
        // イベント一覧ページに遷移する。
        setEvents(events.filter((event) => event.id !== eventId));
        // eventId に対応するイベントを events 配列から削除し、それ以外のイベントの配列を新しく生成して、events の state を更新している
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await window.fetch(`/api/events/${updatedEvent.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // 指定されたイベントの要素を更新するためにJSON形式でサーバー側に送信している。

      if (!response.ok) throw Error(response.statusText);

      const newEvents = events;
      const idx = newEvents.findIndex((event) => event.id === updatedEvent.id);
      newEvents[idx] = updatedEvent;
      setEvents(newEvents);
      // ここですべてのeventsの値を更新している。
      success("Event Updated!");
      navigate(`/events/${updatedEvent.id}`);
      // navigate関数はページを遷移するために使われる。
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <EventList events={events} />
            <Routes>
              <Route
                path=":id"
                element={<Event events={events} onDelete={deleteEvent} />}
              />
              <Route
                path=":id/edit"
                element={<EventForm events={events} onSave={updateEvent} />}
              />
              <Route path="new" element={<EventForm onSave={addEvent} />} />
            </Routes>
          </>
        )}
      </div>
    </>
    // ここでURLの値が3つのうちどれかにマッチしたときにそのページに遷移する

    //   URLがnewにマッチするとEventFormコンポーネントがレンダリングされる
  );
};

export default Editor;
