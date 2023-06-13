import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store/store";
const rootContainer = document.getElementById("root");

createRoot(rootContainer).render(
  <Provider store={store}>
    <App />
  </Provider>
);
