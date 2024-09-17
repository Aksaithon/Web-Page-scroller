import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  username: string;
  text: string;
  tags: string[] | string | undefined;
  likes: number;
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

    // action to update an existing reel
    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          ...updatedPost, // Merge the updated fields with the existing reel
        };
      }
    },
  },
});

// export actions and reducers

export const { setUserPosts, addUserPosts, clearUserPosts, updatePost } = userPostSlice.actions;
export default userPostSlice.reducer;
