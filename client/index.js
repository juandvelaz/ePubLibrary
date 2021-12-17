import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, NavBar } from './components';

ReactDOM.render(
  <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </Router>,
  document.getElementById('app')
);
