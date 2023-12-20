import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider, Sidebar } from "./context/Sidebar";
import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <SidebarProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Sidebar />
            <Modal />
          </BrowserRouter>
        </Provider>
      </SidebarProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
