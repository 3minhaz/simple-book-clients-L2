import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getTenBooks: builder.query({
      query: () => "/landing-page-books",
    }),
    getAllBooks: builder.query({
      query: ({ searchTerm }) => `/books?searchTerm=${searchTerm}`,
    }),
    getSingleBooks: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default api;

export const {
  useGetTenBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
  usePostCommentMutation,
} = api;
