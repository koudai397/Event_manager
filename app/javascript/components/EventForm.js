import React from "react";

const EventForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  // フォームの入力を処理するための関数 handleSubmit を定義しています。
  // preventDefault()を呼び出さないと入力したフォームが送信されたときにブラウザがデフォルトのイベント動作を実行し、ページを再読み込みします。そうすると、ユーザーの入力した情報が消えてしまい、初期状態に戻ってしまうのでpreventDefaultを呼び出しています

  return (
    <section>
      <h2>New Event</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        {/* ここで送信されたときに、先程定義したhandleSubmitを呼び出すようにしている */}
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input type="text" id="event_type" name="event_type" />
          </label>
          {/* このhtmlForで指定した要素とinputのidを一致させることで関連付けをしている。labelをクリックすることによって、自動的にフォームに移動するようになっている。以下で同じことをしている↓ */}
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input type="text" id="event_date" name="event_date" />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea cols="30" rows="10" id="title" name="title" />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input type="text" id="speaker" name="speaker" />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input type="text" id="host" name="host" />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input type="checkbox" id="published" name="published" />
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
