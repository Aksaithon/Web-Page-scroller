import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reels {
  _id: string;
  username: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ReelPostState {
  reels: Reels[];
}

// define initial states for reel array
const initialState: ReelPostState = {
  reels: [],
};

// create reel post slice

const reelPostSlice = createSlice({
  name: "reels",
  initialState,
  reducers: {
    // actions to set all reels

    setAllReels: (state, action: PayloadAction<Reels[]>) => {
      state.reels = action.payload;
    },

    // action to add new reel
    addNewReel: (state, action: PayloadAction<Reels[]>) => {
      state.reels = [...state.reels, ...action.payload];
    },

    // clear all reels array
    clearAllReels: (state) => {
      state.reels = [];
    },
  },
});

//  export actions and reducers

export const { setAllReels, addNewReel, clearAllReels } = reelPostSlice.actions;
export default reelPostSlice.reducer;
