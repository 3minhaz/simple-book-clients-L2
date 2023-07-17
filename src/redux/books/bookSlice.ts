import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  genre: "",
  year: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setSearchTerm, setGenre, setYear } = bookSlice.actions;

export default bookSlice.reducer;
