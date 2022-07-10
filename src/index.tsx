import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
