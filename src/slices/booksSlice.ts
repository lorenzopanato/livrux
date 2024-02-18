import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searched: "",
};

export const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {
    searchBooks: (state, action: PayloadAction<string>) => {
      state.searched = action.payload;
    },
  },
});

export const { searchBooks } = booksSlice.actions;

export default booksSlice.reducer;