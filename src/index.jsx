import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux"; // compose
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducer from "./reducer";
import "./Components/Index.css";
import App from "./Components/App";
import { watcherSaga, deleterSaga, editerSaga, addrSaga } from "./Sagas/Saga";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const SagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(SagaMiddleware));
// const store = createStore(
//   reducer,
//   /* preloadedState, */ composeEnhancers(applyMiddleware(SagaMiddleware))
// );
SagaMiddleware.run(deleterSaga);
SagaMiddleware.run(editerSaga);
SagaMiddleware.run(addrSaga);
SagaMiddleware.run(watcherSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
