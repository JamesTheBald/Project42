import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";   // C: How does the BrowserRouter library work? In every single way...

import App from "./App";
import * as serviceWorker from "./serviceWorker";     // J: what is serviceWorker?

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();