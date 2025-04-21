import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  type: string;
  genre: string;
}

const initialState: CategoryState = {
  type: "home",
  genre: "all",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    resetCategory(state) {
      state.type = "home";
      state.genre = "all";
    },
  },
});

export const { setType, setGenre, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
