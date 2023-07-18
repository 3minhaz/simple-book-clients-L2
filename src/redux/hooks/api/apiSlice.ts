import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://simple-book-a5-server.vercel.app",
  // }),
  tagTypes: ["books", "wishlist", "reading"],
  endpoints: (builder) => ({
    getTenBooks: builder.query({
      query: () => "/landing-page-books",
      providesTags: ["books"],
    }),
    getAllBooks: builder.query({
      query: ({ searchTerm }) => `/books?searchTerm=${searchTerm}`,
      providesTags: ["books"],
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
      invalidatesTags: ["books"],
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
    getWishListBook: builder.query({
      query: (email) => `/wishlist-get/${email}`,
      providesTags: ["wishlist"],
    }),
    removeFromWishList: builder.mutation({
      query: ({ id, email }) => ({
        url: `/wishlist/?email=${email}&id=${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["wishlist"],
    }),
    postComment: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    addWishList: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
    }),
    addReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading-list`,
        method: "POST",
        body: data,
      }),
    }),
    updateReadingStatus: builder.mutation({
      query: ({ email, ...data }) => ({
        url: `/reading-status-update/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reading"],
    }),
    getReadingList: builder.query({
      query: (email) => `/reading-list/${email}`,
      providesTags: ["reading"],
    }),
    // getWishListBook: builder.query({
    //   query: (email) => ({
    //     url: `/wishlist-get/${email}`,
    //   }),
    // }),
  }),
});

export default api;

export const {
  useGetTenBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
  useGetWishListBookQuery,
  useUpdateCommentMutation,
  usePostCommentMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useAddWishListMutation,
  useRemoveFromWishListMutation,
  useAddReadingListMutation,
  useGetReadingListQuery,
  useUpdateReadingStatusMutation,
} = api;
