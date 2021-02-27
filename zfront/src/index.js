import React from "react";
import ReactDOM from "react-dom";
import './styles/tailwind_built.css';
import App from "./App";

// import * as serviceWorker from "./services/serviceWorker"; 


ReactDOM.render(
  // <BrowserRouter>
    <App />,
  // </BrowserRouter>,
  document.getElementById("root")
);

// serviceWorker.unregister();