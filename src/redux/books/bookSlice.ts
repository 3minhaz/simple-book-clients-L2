import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  filters: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setSearchTerm, setFilters } = bookSlice.actions;

export default bookSlice.reducer;
