import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const EventList = ({ events }) => {
  //このEventListコンポーネントはrenderEvents関数が返してきた配列をulタグ要素に格納するだけの処理しかしてない
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    const { id, published, created_at, updated_at, ...rest } = obj;
    // ここで、指定されたプロパティ以外はrestという変数に格納される。
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    // 先程格納したrestの中から、searchTermを含む文字列がないか確認している。indexOfメソッドは指定した文字列が配列内にない場合に-1 を返す。つまり、配列内に指定した文字列が見つからない場合はsomeメソッドがfalseを返す。
  };

  const renderEvents = (eventArray) =>
    //このrenderEvents関数は新しい日付順にならんだイベント配列を返している。
    eventArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
      .map((event) => (
        <li key={event.id}>
          <NavLink to={`/events/${event.id}`}>
            {event.event_date}
            {" - "}
            {event.event_type}
          </NavLink>
        </li>
      ));

  return (
    <section className="eventList">
      <h2>
        Events
        <Link to="/events/new">New Event</Link>
      </h2>
      <input
        className="search"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
        // ユーザーがキーを離した瞬間にupdateSearchTerm関数が呼び出される
      />
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
