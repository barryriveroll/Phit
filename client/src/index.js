import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import addReactNDevTools from "reactn-devtools";
import App from "./App";

addReactNDevTools();

setGlobal({
  username: ""
});

render(<App />, document.getElementById("root"));
