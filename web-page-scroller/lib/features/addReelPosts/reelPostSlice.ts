import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reels {
  _id: string;
  username: string;
  text: string;
  tags: string[] | string | undefined;
  likes: number;
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

    // action to update an existing reel
    updateReel: (state, action: PayloadAction<Reels>) => {
      const updatedReel = action.payload;
      const index = state.reels.findIndex(
        (reel) => reel._id === updatedReel._id
      );

      if (index !== -1) {
        state.reels[index] = {
          ...state.reels[index],
          ...updatedReel, // Merge the updated fields with the existing reel
        };
      }
    },
  },
});

//  export actions and reducers

export const { setAllReels, addNewReel, clearAllReels, updateReel } = reelPostSlice.actions;
export default reelPostSlice.reducer;
