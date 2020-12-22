import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter as Router,
   // Switch,
   // Route
 } from "react-router-dom";

import './index.css';
import App from './App';
import './tailwind.output.css';
// import reportWebVitals from './reportWebVitals';  // See comment at bottom


//Original strict-mode React render commands replaced with React-Router version
// i.e. replaced  <React.StrictMode> with <Router>
ReactDOM.render(
   <Router>
     <App />
   </Router>,
   document.getElementById("root")
 );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// Above WebVitals commented out to reduce clutter in the console.log
