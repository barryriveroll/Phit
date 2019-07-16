import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import App from "./App";

setGlobal({
  profilePicture: "https://i.imgur.com/1vwfqhE.jpg",
  username: ""
});

render(<App />, document.getElementById("root"));
