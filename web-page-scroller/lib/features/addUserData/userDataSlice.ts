import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  fullName: string;
  email: string;
  username: string;
}

interface usernameState {
  username: string;
}

interface userfullNameState {
  fullName: string;
}

// define initial state

const initialState: UserState = {
  id: "",
  fullName: "",
  email: "",
  username: "",
};

// create the user data slice

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // action to set user data
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    setUserName: (state, action: PayloadAction<usernameState>) => {
      state.username = action.payload.username;
    },
    setFullName: (state, action: PayloadAction<userfullNameState>) => {
      state.fullName = action.payload.fullName;
    },
    // action to reset user data(optional)
    clearUserData: (state) => {
      state.id = "";
      state.fullName = "";
      state.email = "";
      state.username = "";
    },
  },
});

// export the actions and reducer
export const { setUserData, setUserName, setFullName, clearUserData } =
  userDataSlice.actions;
export default userDataSlice.reducer;
