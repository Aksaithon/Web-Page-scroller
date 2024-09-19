import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  dataLeft: boolean;
}

const initialState: Data = {
  dataLeft: true,
};

// create dataleft slice

const pageNoSlice = createSlice({
  name: "dataLeft",
  initialState: initialState,
  reducers: {
    // actions to update index
    isDataLeft: (state, action: PayloadAction<boolean>) => {
      state.dataLeft = action.payload; // Replace index with new value
    },
  },
});

export const { isDataLeft } = pageNoSlice.actions;
export default pageNoSlice.reducer;
