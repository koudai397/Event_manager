import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

const Event = ({ events, onDelete }) => {
  const { id } = useParams();
  // URLからeventのid(パラメータ)を取得する。
  const event = events.find((e) => e.id === Number(id));
  // 先程取得したidを利用して、Number(id)に等しい最初の要素を検索し、その結果をeventに代入している
  // Number関数は引数に与えられたものを数字に変換する
  // そして、その後、下のところでeventオブジェクトのプロパティを使って、ページに表示されるコンテンツ(event_date)などを表示している

  return (
    <div className="eventContainer">
      <h2>
        {event.event_date}
        {" - "}
        {event.event_type}
        <Link to={`/events/${event.id}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Type:</strong> {event.event_type}
        </li>
        <li>
          <strong>Date:</strong> {event.event_date}
        </li>
        <li>
          <strong>Title:</strong> {event.title}
        </li>
        <li>
          <strong>Speaker:</strong> {event.speaker}
        </li>
        <li>
          <strong>Host:</strong> {event.host}
        </li>
        <li>
          <strong>Published:</strong> {event.published ? "yes" : "no"}
        </li>
      </ul>
    </div>
  );
};
// publishedは公開されていればtrue,されていなければfalse

Event.propTypes = {
  events: PropTypes.arrayOf(
    // eventsのプロパティの型を定義している
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  // onDelete関数が含まれていないとエラーを表示する
};

export default Event;
