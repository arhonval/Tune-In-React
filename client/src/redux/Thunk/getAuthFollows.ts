import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFollows, newFollow, unsub } from "./authFollows.api";

const getAuthFollows = createAsyncThunk("auth follows", async () => {
  try {
    const result = await authFollows();
    return result;
  } catch (error) {
    alert(error);
  }
});

const getNewFollow = createAsyncThunk("new follow", async (id) => {
  try {
    const result = await newFollow(id);
    return result;
  } catch (error) {
    alert(error);
  }
});

const getUnsub = createAsyncThunk("unsub", async (id) => {
  try {
    const result = await unsub(id);
    return result;
  } catch (error) {
    alert(error);
  }
});

export { getAuthFollows, getNewFollow, getUnsub };
