import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { formatDate, isEmptyObject, validateEvent } from "../helpers/helpers";

const EventForm = ({ events, onSave }) => {
  const { id } = useParams();

  const initialEventState = useCallback(() => {
    // useCallbackを使い、関数をキャッシュすることでパフォーマンスを向上させる
    const defaults = {
      event_type: "",
      event_date: "",
      title: "",
      speaker: "",
      host: "",
      published: false,
    };

    const currEvent = id ? events.find((e) => e.id === Number(id)) : {};
    // events配列からidが一致するイベントを探し出している

    return { ...defaults, ...currEvent };
    // オブジェクトの更新をしている
  }, [events, id]);
  // このようにuseCallback関数でラップすることによって、eventsとidが変更された場合にだけ関数が再計算され、もともとあった関数がキャッシュされパフォーマンスがよくなる。

  const [event, setEvent] = useState(initialEventState);
  // URLからidに対応するイベント情報をフォームに入力している。ない場合は、defaultsの情報をフォームに入力する。

  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);
  // useRefを使ってdateInputを変更している

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };
  // この関数はsetEventを呼び出して、eventの値を更新している

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent("event_date", formattedDate);
        //   HTMLの要素のevent_dateに選択された値が入る
        //fieldやonSelectというオプションを使っている。fieldは必須で、noSelectは選択可能。
        // 選択された値(date)を受け取り、それをヘルパー関数のformatDateで年、月、日の状態にしている。dateInputを更新している。
      },
    });

    // クリーンアップ用の関数を返す
    // Reactはアンマウントの前にこれを呼び出す
    return () => p.destroy();
    // これをしないと、Pikadayのインスタンスが残り続け、アプリのパフォーマンスに影響がでる。
  }, []);

  useEffect(() => {
    setEvent(initialEventState);
  }, [events]);
  // eventsが変更された場合に、initialEventStateで状態を更新する。（ユーザーがイベントを編集中に「New Event」をクリックしたらフィールドがクリアされるようにする処理）

  const handleInputChange = (e) => {
    //   この関数はフォームの入力値が変更されたときに呼び出される関数。
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //e(イベントオブジェクト)には様々なイベントに関する情報が入っており、今回はtargetからイベントが発生した要素自体を参照している。次にtargetプロパティからnameプロパティを取り出している。
    //そして、最後にフォーム欄の種類がcheckboxであれば、targetの中にcheckedの値を代入して、checkbox以外の場合は通常のフォーム欄の値としてvalueを代入している
    updateEvent(name, value);
    // このupdateEvent関数で値を更新している
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      // formErrorsが空だった場合nullを返す。
      return null;
    }

    return (
      // formErrorsにエラーが含まれている場合、以下を返す。
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            //   Object.values()で配列にアクセス。
            //   mapメソッドをつかい、formErrors配列から一つづつ取り出して、liタグを各要素に付与して表示さしている
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    // フォームの入力を処理するための関数 handleSubmit を定義しています。
    // preventDefault()は、イベントが持つデフォルトの動作をキャンセルするメソッド
    // これをしないと、入力したフォームが送信されたときにブラウザがデフォルトのイベント動作を実行し、ページを再読み込みをする。そうすると、ユーザーの入力した情報が消えてしまい、初期状態に戻ってしまうのでpreventDefaultを呼び出している。
    e.preventDefault();
    const errors = validateEvent(event);
    //   validateEventを呼び出して現在のフォームの状態であるeventをerrorsに代入している
    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
      // ここでisEmptyObject関数を使用して中身が空でない場合, つまりフォームにエラーがある場合は、setFormErrors関数でエラーを表示させている。
    } else {
      onSave(event);
    }
  };

  const cancelURL = event.id ? `/events/${event.id}` : "/events";
  // URLにidがあればその詳細ページに遷移して、idがない場合は一覧ページに遷移する
  const title = event.id
    ? `${event.event_date} - ${event.event_type}`
    : "New Event";
  // idによっとタイトルを変更する

  return (
    <div>
      <h2>{title}</h2>
      {renderErrors()}
      {/* エラーがあれば表示される */}
      <form className="eventForm" onSubmit={handleSubmit}>
        {/* ここで送信されたときに、先程定義したhandleSubmitを呼び出すようにしている */}
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input
              type="text"
              id="event_type"
              name="event_type"
              onChange={handleInputChange}
              value={event.event_type}
            />
          </label>
          {/* 値を更新するたびに、handleInputChangeが呼び出される */}
          {/* このhtmlForで指定した要素とinputのidを一致させることで関連付けをしている。labelをクリックすることによって、自動的にフォームに移動するようになっている。以下で同じことをしている↓ */}
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
              ref={dateInput}
              autoComplete="off"
              value={event.event_date}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={event.title}
            />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input
              type="text"
              id="speaker"
              name="speaker"
              onChange={handleInputChange}
              value={event.speaker}
            />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input
              type="text"
              id="host"
              name="host"
              onChange={handleInputChange}
              value={event.host}
            />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input
              type="checkbox"
              id="published"
              name="published"
              onChange={handleInputChange}
              checked={event.published}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EventForm;

EventForm.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};
// ここで、各要素にそれぞれのプロパティが必須であることを示している。
EventForm.defaultProps = {
  events: [],
};
// EventFormコンポーネントにeventsが渡されなかったときに、デフォルト値として空の配列を渡す。
// また、上で定義された型チェックに失敗したときに実行される
