import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../Services/loginApi";
import tokenReducer from "../slices/tokenSlice";
import { registerApi } from "../Services/registerApi";
import { googleBooksApi } from "./../Services/googleBooksApi";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [googleBooksApi.reducerPath]: googleBooksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      registerApi.middleware,
      googleBooksApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
