import { createSlice } from "@reduxjs/toolkit";
import { getAuthFollows, getNewFollow, getUnsub } from "./Thunk/getAuthFollows";

const initialState = {
  authFollowings: [],
  authFollowers: [],
  loading: false,
};

const authFollowsSlice = createSlice({
  name: "authFollows",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthFollows.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthFollows.fulfilled, (state, action) => {
        state.loading = false;
        state.authFollowings = [...action.payload.authFollowings];
        state.authFollowers = [...action.payload.authFollowers];
      })
      .addCase(getAuthFollows.rejected, (state) => {
        state.loading = false;
        console.error("error auth follows");
      })
      .addCase(getNewFollow.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.authFollowings.push(action.payload);
      })
      .addCase(getNewFollow.rejected, (state) => {
        state.loading = false;
        console.error("error new follow");
      })
      .addCase(getUnsub.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnsub.fulfilled, (state, action) => {
        state.loading = false;
        state.authFollowings = [
          ...state.authFollowings.filter(
            (el) => el.follow_id !== action.payload.unsubId
          ),
        ];
      })
      .addCase(getUnsub.rejected, (state) => {
        state.loading = false;
        console.error("error unsub");
      })
      .addDefaultCase(() => {});
  },
});

export default authFollowsSlice.reducer;
