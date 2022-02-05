import React from "react";
import ReactDOM from "react-dom";
import {RssAppRouter} from "./routers/RssAppRouter";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <RssAppRouter />
  </BrowserRouter>,
  document.getElementById("root")
);
