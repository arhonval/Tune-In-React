import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllBands, fetchSuggestAddress } from "./allBands.api";

const getAllBands = createAsyncThunk("fetchAllBands", async () => {
    try {
      const result = await fetchAllBands();
      return result;
    } catch (error) {
      alert(error);
    }
  });

const getSuggestAddress = createAsyncThunk('fetchAddress', async () => {
    try {
        const result = await fetchSuggestAddress();
        return result
      } catch (error) {
        alert(error);
      }
})

export { getAllBands, getSuggestAddress };