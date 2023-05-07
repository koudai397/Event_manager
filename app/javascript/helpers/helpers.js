import { error } from "./notifications";

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;
//   ここでobj引数にformErrorsオブジェクトの値が入る。そして、そのオブジェクトの配列が空で無いかを確認している。

const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));
// Date.parseは与えられた文字列を1970年1月1日午前0時（UTC）からの経過ミリ秒数に変換する。それをチェックして、trueかfalseをisValidDateに格納している

export const validateEvent = (event) => {
  //hundleSubumit関数のなかで呼ばれている。フォームを送信したときにエラーがないかバリデーションチェックをしている
  const errors = {};
  //   空のオブジェクトを作成して、下の処理でエラーがある場合はエラーメッセージをこのオブジェクトに入れていく。
  //   最後にerrorsオブジェクトを返している
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
  if (!isValidDate(event.event_date)) {
    errors.event_date = "You must enter a valid date";
  }
  // event_dataが有効でない場合にエラーを表示する
  return errors;
};

export const handleAjaxError = (err) => {
  error("Something went wrong");
  console.error(err);
};
