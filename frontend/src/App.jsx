import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScene from "./mainScene/MainScene";

import Things from "./thingsToDo/things";
import Page2 from "./thingsToDo/Page2";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Things />} />
        <Route path="/page2.html" element={<Page2 />} />
        <Route path="/mainScene" element={<MainScene />} />
      </Routes>
    </Router>
  );
};

export default App;