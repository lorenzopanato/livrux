import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const googleBooksApi = createApi({
  reducerPath: "googleBooksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    findAllBooksFavorite: builder.query({
      query: () => "volumes?q=books&filter=paid-ebooks&orderBy=relevance",
    }),
    findAllBooksGeek: builder.query({
      query: () =>
        "volumes?q=heroesmarvel&maxResults=10&filter=paid-ebooks&orderBy=relevance",
    }),
    findAllBooksSeries: builder.query({
      query: () =>
        "volumes?q=harrypotterand&maxResults=10&filter=paid-ebooks&orderBy=relevance",
    }),
  }),
});

export const {
  useFindAllBooksFavoriteQuery,
  useFindAllBooksGeekQuery,
  useFindAllBooksSeriesQuery,
} = googleBooksApi;
