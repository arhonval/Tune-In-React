
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProfiles, fetchAllUserGenres, fetchAllUserInstruments } from "./allprofile.api";
import { sortByGenre } from "../allProfiles.slice";


const getAllProfiles = createAsyncThunk("fetchAllProfiles", async () => {
  try {
    const result = await fetchAllProfiles();
    return result;
  } catch (error) {
    alert(error);
  }
});

const getAlluserGenres = createAsyncThunk("fetchAllUserGenres", async (clickedGenres, { dispatch }) => {
    try {
      const result = await fetchAllUserGenres(clickedGenres);
      console.log(result);
      
      return result;
    } catch (error) {
      alert(error);
    }
  });

  const getAllUserInstruments= createAsyncThunk("fetchAllUserGenres", async (clickedInstruments, { dispatch }) => {
    try {
      const result = await fetchAllUserInstruments(clickedInstruments);
      console.log(result);
      
      return result;
    } catch (error) {
      alert(error);
    }
  });

export  { getAllProfiles, getAlluserGenres, getAllUserInstruments };