// Redux
import {
  ActionFromReducersMapObject,
  Reducer,
  StateFromReducersMapObject,
} from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Modules
import * as Payments from "./modules/payments";

export type AppRootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export type Action<Payload, Args extends Array<unknown>> = (...args: Args) => {
  payload: Payload;
};

export type RootReducer<T> = Reducer<
  StateFromReducersMapObject<T>,
  ActionFromReducersMapObject<T>
>;

/**
 * Store Setup
 * ---------------------------------------------------------------------
 */

const reducers = {
  payments: Payments.reducer,
};

export const rootReducer: RootReducer<typeof reducers> =
  combineReducers(reducers);

// Set up the store
export const store = configureStore({
  reducer: rootReducer,
});

/**
 * Exports
 * ---------------------------------------------------------------------
 */

// Module exports
export { Payments };

// Provider exports

export * from "./utils/provider";

export * from "./utils/react-redux";
