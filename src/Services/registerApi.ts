import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApiReqres } from "../utils/api";
import { RegisterData } from "../utils/interfaces";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urlApiReqres,
  }),
  tagTypes: ["RegisterData"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: RegisterData) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
