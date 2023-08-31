import { createSlice } from "@reduxjs/toolkit";
import {
  getNewPhoto,
  getNewSong,
  getProfile,
  getUpdateProfile,
} from "./Thunk/getProfile";

const initialState = {
  user: {},
  genres: [],
  instruments: [],
  followings: [],
  bands: [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = { ...action.payload.user };
        state.genres = [...action.payload.genres];
        state.instruments = [...action.payload.instruments];
        state.followings = [...action.payload.followings];
        state.bands = [...action.payload.bands];
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
        console.error("error profile");
      })
      .addCase(getNewPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.user.photo = action.payload.user.photo;
      })
      .addCase(getNewPhoto.rejected, (state) => {
        state.loading = false;
        console.error("error photo");
      })
      .addCase(getNewSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewSong.fulfilled, (state, action) => {
        state.loading = false;
        state.user.Songs = [...action.payload.user.Songs];
      })
      .addCase(getNewSong.rejected, (state) => {
        state.loading = false;
        console.error("error song");
      })
      .addCase(getUpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.city = action.payload.user.city;
        state.user.about = action.payload.user.about;
        state.user.telegram = action.payload.user.telegram;
        state.user.insta = action.payload.user.insta;
        state.user.youtube = action.payload.user.youtube;
        state.user.soundcloud = action.payload.user.soundcloud;
        state.user.UserType = { ...action.payload.user.UserType };
        state.genres = [...action.payload.genres];
        state.instruments = [...action.payload.instruments];
      })
      .addCase(getUpdateProfile.rejected, (state) => {
        state.loading = false;
        console.error("error update");
      })
      .addDefaultCase(() => {});
  },
});

export default profileSlice.reducer;
