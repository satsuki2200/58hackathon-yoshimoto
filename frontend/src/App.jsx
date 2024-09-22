// import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Things from './thingsToDo/things';
import Page2 from './thingsToDo/Page2';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route exact path='/' component={Things} />
          <Route path='/page2.html' component={Page2} />
        </Routes>
      </Router>
    );
};

export default App;