import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authFollows,
  fetchProfile,
  loadSong,
  updatePhoto,
  updateUser,
} from "./profile.api";

const getProfile = createAsyncThunk("fetchProfile", async (login) => {
  try {
    const result = await fetchProfile(login);
    return result;
  } catch (error) {
    alert(error);
  }
});

const getNewPhoto = createAsyncThunk("new photo", async ({ login, photo }) => {
  try {
    const result = await updatePhoto({ login, photo });
    return result;
  } catch (error) {
    alert(error);
  }
});

const getNewSong = createAsyncThunk("new song", async ({ login, song }) => {
  try {
    const result = await loadSong({ login, song });
    return result;
  } catch (error) {
    alert(error);
  }
});

const getUpdateProfile = createAsyncThunk(
  "update profile",
  async ({ login, info }) => {
    try {
      const result = await updateUser({ login, info });
      return result;
    } catch (error) {
      alert(error);
    }
  }
);

export { getProfile, getNewPhoto, getNewSong, getUpdateProfile };
