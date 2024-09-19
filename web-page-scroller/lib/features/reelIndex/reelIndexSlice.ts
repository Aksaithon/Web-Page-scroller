import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Index {
  index: number;
}

const initialIndex: Index = {
  index: 0,
};

// create index slice

const indexSlice = createSlice({
  name: "index",
  initialState: initialIndex,
  reducers: {
    // actions to update index
    updateIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload; // Replace index with new value
    },
  },
});

export const { updateIndex } = indexSlice.actions;
export default indexSlice.reducer;
