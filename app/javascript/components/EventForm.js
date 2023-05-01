import React from "react";
import React, { useState } from "react";

const EventForm = () => {
  const [event, setEvent] = useState({
    event_type: "",
    event_date: "",
    title: "",
    speaker: "",
    host: "",
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { target } = e;
    //このeには、様々なイベントに関する情報が入っており、今回は入力された名前と値を抽出し、それをsetEvent関数をつかって、状態を管理している。
    const { name } = target;
    //eにはイベントが発生した要素に関する情報が入っており、targetにはイベントが発生した要素自体を参照している。ここではtargetプロパティにあるnameだけを取り出している。
    const value = target.type === "checkbox" ? target.checked : target.value;
    //フォーム欄の種類がcheckboxであれば、targetの中にcheckedの値を代入して、checked以外の場合は通常のフォーム欄の値としてvalueを代入している

    setEvent({ ...event, [name]: value });
    //eventオブジェクトのコピーを作って、nameとvalueを更新している。
  };

  const validateEvent = () => {
    const errors = {};

    if (event.event_type === "") {
      errors.event_type = "You must enter an event type";
    }
    if (event.event_date === "") {
      errors.event_date = "You must enter a valid date";
    }
    if (event.title === "") {
      errors.title = "You must enter a title";
    }
    if (event.speaker === "") {
      errors.speaker = "You must enter at least one speaker";
    }
    if (event.host === "") {
      errors.host = "You must enter at least one host";
    }
    return errors;
  };

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの入力を処理するための関数 handleSubmit を定義しています。
    // preventDefault()を呼び出さないと入力したフォームが送信されたときにブラウザがデフォルトのイベント動作を実行し、ページを再読み込みします。そうすると、ユーザーの入力した情報が消えてしまい、初期状態に戻ってしまうのでpreventDefaultを呼び出しています
    const errors = validateEvent(event);
    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      console.log(event);
    }
  };

  return (
    <section>
      {renderErrors()}

      <h2>New Event</h2>
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
            />
          </label>
          {/* このhtmlForで指定した要素とinputのidを一致させることで関連付けをしている。labelをクリックすることによって、自動的にフォームに移動するようになっている。以下で同じことをしている↓ */}
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
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
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
        {/* type="submit"が指定されたボタンなので、↑form 要素の onSubmit ハンドラが呼び出されます */}
      </form>
    </section>
  );
};

export default EventForm;
