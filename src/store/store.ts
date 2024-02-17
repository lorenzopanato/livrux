import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../Services/loginApi";
import tokenReducer from "../slices/tokenSlice";
import { registerApi } from "../Services/registerApi";

export const store = configureStore({
  reducer: {
    //   navBar: navBarReducer,
    token: tokenReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, registerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
