import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Event = ({ events }) => {
  const { id } = useParams();
  // URLからid(パラメータ)を取得する。
  const event = events.find((e) => e.id ===const Event = ({ events }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  // 先程取得したidを利用して、Number(id)に等しい最初の要素を検索し、その結果をeventに代入している
  // Number関数は引数に与えられたものを数字に変換する
  // そして、その後、下のところでeventオブジェクトのプロパティを使って、ページに表示されるコンテンツ(event_date)などを表示している

  return (
    <>
      <h2>
        {event.event_date}
        {" - "}
        {event.event_type}
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
    </>
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
};

export default Event;
