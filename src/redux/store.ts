/* eslint-disable @typescript-eslint/no-unsafe-call */
import { configureStore } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
