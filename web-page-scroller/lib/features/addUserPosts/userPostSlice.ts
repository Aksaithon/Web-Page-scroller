import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserPostState {
  posts: Post[];
}

// define initial states for post array
const initialState: UserPostState = {
  posts: [],
};

// create the user post slice

const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    // actions to set userPost
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload; // Replace posts array with new data
    },

    // actions to add new post in array
    addUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload]; // Append posts
    },

    // actions to clear userPost array
    clearUserPosts: (state) => {
      state.posts = []; // Clear posts array
    },
  },
});

// export actions and reducers

export const { setUserPosts, addUserPosts, clearUserPosts } = userPostSlice.actions;
export default userPostSlice.reducer;
