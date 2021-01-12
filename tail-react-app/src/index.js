import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import './tailwind.output.css';

const port = 8082;


// <React.StrictMode> render wrapper replaced with <Router>
ReactDOM.render(
   <Router>
     <App />
   </Router>,
   document.getElementById("root")
 );
