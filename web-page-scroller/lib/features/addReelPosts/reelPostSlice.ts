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
  reels: [
    // {
    //   _id: "1",
    //   username: "user1",
    //   text: "test-text1",
    //   tags: "test-tags1",
    //   likes: 1,
    // },
    // {
    //   _id: "2",
    //   username: "user2",
    //   text: "test-text2",
    //   tags: "test-tags2",
    //   likes: 2,
    // },
    // {
    //   _id: "3",
    //   username: "user3",
    //   text: "test-text3",
    //   tags: "test-tags3",
    //   likes: 3,
    // },
  ],
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

export const { setAllReels, addNewReel, clearAllReels, updateReel } =
  reelPostSlice.actions;
export default reelPostSlice.reducer;
