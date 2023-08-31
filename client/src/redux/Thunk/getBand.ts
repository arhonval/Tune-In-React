import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBand,
  fetchBand,
  loadBandSong,
  newMember,
  updateBand,
  updateBandPhoto,
} from "./band.api";

const getBand = createAsyncThunk("get band", async (id) => {
  try {
    const result = await fetchBand(id);
    return result;
  } catch (error) {
    alert(error);
  }
});

const getNewBandPhoto = createAsyncThunk(
  "new band photo",
  async ({ id, photo }) => {
    try {
      const result = await updateBandPhoto({ id, photo });
      return result;
    } catch (error) {
      alert(error);
    }
  }
);

const getNewBandSong = createAsyncThunk(
  "new band song",
  async ({ id, song }) => {
    try {
      const result = await loadBandSong({ id, song });
      return result;
    } catch (error) {
      alert(error);
    }
  }
);

const getUpdateBand = createAsyncThunk("update band", async ({ id, info }) => {
  try {
    const result = await updateBand({ id, info });
    return result;
  } catch (error) {
    alert(error);
  }
});

const getCreatedBand = createAsyncThunk("create band", async (id) => {
  try {
    const result = await createBand(id);
    return result;
  } catch (error) {
    alert(error);
  }
});

const getNewMember = createAsyncThunk(
  "new member",
  async ({ userId, bandId }) => {
    try {
      const result = await newMember({ userId, bandId });
      return result;
    } catch (error) {
      alert(error);
    }
  }
);

export {
  getBand,
  getNewBandPhoto,
  getNewBandSong,
  getUpdateBand,
  getCreatedBand,
  getNewMember,
};
