import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";   // C: How does this library work?
import './styles/tailwind.css';
// import * as serviceWorker from "./services/serviceWorker"; 

import App from "./App";

ReactDOM.render(
  // <BrowserRouter>
    <App />,
  // </BrowserRouter>,
  document.getElementById("root")
);

// serviceWorker.unregister();