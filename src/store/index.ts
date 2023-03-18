import { combineReducers } from "@reduxjs/toolkit";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";

const reducer = combineReducers({
  auth,
});

export type AppState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as ThunkMiddleware<AppState, any>),
});
