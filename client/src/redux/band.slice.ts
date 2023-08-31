import { createSlice } from "@reduxjs/toolkit";
import {
  getBand,
  getCreatedBand,
  getNewBandPhoto,
  getNewBandSong,
  getNewMember,
  getUpdateBand,
} from "./Thunk/getBand";

const initialState = {
  band: {},
  bandMembers: [],
  notBandMembers: [],
  loading: false,
};

const bandSlice = createSlice({
  name: "band",
  initialState,
  reducers: {
    clearBand: (state, action) => {
      state.band = action.payload;
      state.bandMembers = [];
      state.notBandMembers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBand.fulfilled, (state, action) => {
        state.loading = false;
        state.band = { ...action.payload.band };
        state.bandMembers = [...action.payload.bandMembers];
        state.notBandMembers = [...action.payload.notBandMembers];
      })
      .addCase(getBand.rejected, (state) => {
        state.loading = false;
        console.error("error band");
      })
      .addCase(getNewBandPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewBandPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.band.photo = action.payload.band.photo;
      })
      .addCase(getNewBandPhoto.rejected, (state) => {
        state.loading = false;
        console.error("error band photo");
      })
      .addCase(getNewBandSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewBandSong.fulfilled, (state, action) => {
        state.loading = false;
        state.band.SongBands = [...action.payload.band.SongBands];
      })
      .addCase(getNewBandSong.rejected, (state) => {
        state.loading = false;
        console.error("error band song");
      })
      .addCase(getUpdateBand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUpdateBand.fulfilled, (state, action) => {
        state.loading = false;
        state.band.name = action.payload.name;
        state.band.city = action.payload.city;
        state.band.about = action.payload.about;
        state.band.telegram = action.payload.telegram;
        state.band.insta = action.payload.insta;
        state.band.youtube = action.payload.youtube;
        state.band.soundcloud = action.payload.soundcloud;
      })
      .addCase(getUpdateBand.rejected, (state) => {
        state.loading = false;
        console.error("error band update");
      })
      .addCase(getCreatedBand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCreatedBand.fulfilled, (state, action) => {
        state.loading = false;
        state.band = { ...action.payload.newBand };
        state.bandMembers = [{ ...action.payload.bandMember }];
        state.notBandMembers = [...action.payload.notBandMembers];
      })
      .addCase(getCreatedBand.rejected, (state) => {
        state.loading = false;
        console.error("error create band");
      })
      .addCase(getNewMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewMember.fulfilled, (state, action) => {
        state.loading = false;
        state.bandMembers = [...action.payload.members];
        state.notBandMembers = [
          ...state.notBandMembers.filter(
            (el) => el.id !== action.payload.userId
          ),
        ];
      })
      .addDefaultCase(() => {});
  },
});

export const { clearBand } = bandSlice.actions;
export default bandSlice.reducer;
