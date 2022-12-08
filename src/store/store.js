import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
