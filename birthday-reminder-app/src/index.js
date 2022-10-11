import React from "react";
import ReactDOM from "react-dom";
import BirthdayState from "./context/BirthdayState";

import "./index.css";
import App from "./App";
import AuthContext from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BirthdayState>
      <AuthContext>
        <App />
      </AuthContext>
    </BirthdayState>
  </React.StrictMode>,
  document.getElementById("root")
);
