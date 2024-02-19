import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log(state, action);
      const { userData } = action.payload;
      state.user = userData.user;
      state.refreshToken = userData.refreshToken;
    },
    logOut: (state) => {
      state.user = null;
      state.refreshToken = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => {
  return state.auth.user;
};
export const selectCurrentToken = (state) => state.auth.refreshToken;
