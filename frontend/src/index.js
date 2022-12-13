import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import "./index.css";
import App from "./App";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

const persistedStore = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>
);
