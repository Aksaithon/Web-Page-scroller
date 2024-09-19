import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface pageNo {
  page: number;
}

const initialPageNo: pageNo = {
  page: 1,
};

// create index slice

const pageNoSlice = createSlice({
  name: "pageNo",
  initialState: initialPageNo,
  reducers: {
    // actions to update index
    updatePageNo: (state, action: PayloadAction<number>) => {
      state.page = action.payload; // Replace index with new value
    },
  },
});

export const { updatePageNo } = pageNoSlice.actions;
export default pageNoSlice.reducer;
