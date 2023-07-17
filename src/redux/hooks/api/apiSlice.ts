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
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book-update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/create-book`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    getSingleBooks: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["books"],
    }),

    postComment: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export default api;

export const {
  useGetTenBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
  useUpdateCommentMutation,
  usePostCommentMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
} = api;
