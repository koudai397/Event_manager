import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  //このEventListコンポーネントはrenderEvents関数が返してきた配列をulタグ要素に格納するだけの処理しかしてない
  const renderEvents = (eventArray) => {
    //このrenderEvents関数は新しい日付順にならんだイベント配列を返している。
    eventArray.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
    //この式によってイベント一覧の日時の新しい順に表示することができる
    return eventArray.map((event) => (
      <li key={event.id}>
        <Link to={`/events/${event.id}`}>
          {event.event_date}
          {" - "}
          {event.event_type}
        </Link>
      </li>
    ));
    //   Linkコンポーネントを使ってeventに対してリンクを付与している
  };

  return (
    <section>
      <h2>Events</h2>
      <ul>{renderEvents(events)}</ul>
    </section>
  );
};

EventList.propTypes = {
  //ここではEventListに渡されるeventsのプロパティの型を指定している。
  events: PropTypes.arrayOf(
    // arrayOfメソッドは、配列内の各要素の型を定義するのに使用されます。
    PropTypes.shape({
      //PropTypesのshapeメソッドは、オブジェクトの各プロパティの型を定義するのに使用されます。
      id: PropTypes.number,
      event_type: PropTypes.string,
      event_date: PropTypes.string,
      title: PropTypes.string,
      speaker: PropTypes.string,
      host: PropTypes.string,
      published: PropTypes.bool,
    })
  ).isRequired,
  //.isRequiredは、このプロパティが必須であることを示しています。EventListコンポーネントがeventsプロパティを受け取らなかった場合、エラーが発生します。
};

export default EventList;
