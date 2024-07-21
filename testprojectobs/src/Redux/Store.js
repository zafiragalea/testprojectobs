import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from 'redux';
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import { UserReducer } from "./Reducer";

const rootReducer = combineReducers({
  user: UserReducer,
});

const logger = createLogger();

const userstore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export default userstore;
