import React, { useState } from "react";
import { isEmptyObject, validateEvent } from "../helpers/helpers";

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
    //   この関数はフォームの入力値が変更されたときに呼び出される関数。
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //e(イベントオブジェクト)には様々なイベントに関する情報が入っており、今回はtargetからイベントが発生した要素自体を参照している。次にtargetプロパティからnameプロパティを取り出している。
    //そして、最後にフォーム欄の種類がcheckboxであれば、targetの中にcheckedの値を代入して、checkbox以外の場合は通常のフォーム欄の値としてvalueを代入している
    setEvent({ ...event, [name]: value });
    //そして、与えられた情報を元にsetEvent関数を使って、eventオブジェクトのコピーを作って、nameとvalueを更新している。
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      // formErrorsが空でないか確認している
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            //   Object.values()で配列を返している。
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
      console.log(event);
      // 中身が空場合(エラーががない場合)は、コンソールにイベントを表示している
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
        {/* type="submit"が指定されているボタンなので、↑form 要素の onSubmit ハンドラが呼び出されます */}
      </form>
    </section>
  );
};

export default EventForm;
