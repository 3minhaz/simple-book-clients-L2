import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTenBooks: builder.query({
      query: () => "/landing-page-books",
    }),
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    getSingleBooks: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export default api;

export const {
  useGetTenBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
} = api;
