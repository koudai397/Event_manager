import React, { useState, useEffect } from "react";
import Header from "./Header";
import EventList from "./EventList";

const Editor = () => {
  const [events, setEvents] = useState([]);
  //このeventsには配列が入っており、それをuseStateを使って初期化している
  const [isLoading, setIsLoading] = useState(true);
  //この変数には真偽値が入っているのだが、レンダリングされるたびにtrueで初期化される。
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
        //エラーを表すために初期値falseからtrueに変更している
        console.error(error);
      }
      //上のfetchDateの処理が終わってから実行される。falseにすることでデータの取得が終わったことを表す。
      setIsLoading(false);
    };

    fetchData();
    //定義したものを実行している
  }, []);

  return (
    <>
      <Header />
      {isError && <p>Something went wrong. Check the console.</p>}

      {isLoading ? <p>Loading...</p> : <EventList events={events} />}
    </>
    //   このコードでは、isLoadingがtrueであれば「Loading...」と表示し、falseであればEventListコンポーネントを表示しています。同様に、isErrorがtrueであればエラーメッセージを表示し、falseであれば表示しないようにしています。
  );
};

export default Editor;
