import React from "react";
import { Routes, Route } from "react-router-dom";
import Editor from "./Editor";

const App = () => (
  <Routes>
    <Route path="events/*" element={<Editor />} />
  </Routes>
);
// Routesコンポーネントを使うことによってeventsから始まるURLを表示するたびにレンダリングされるようになる

export default App;
