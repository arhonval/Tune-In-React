import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGenres, getInstruments } from "../../tags.slice";


export const getGenresFetch = createAsyncThunk('genres/getGenres', async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3000/genres')
  
      if (response.ok) {
        const data = await response.json();
        dispatch(getGenres(data));
      } else {
        throw new Error('failed');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  export const getIntrumentsFetch = createAsyncThunk('genres/getGenres', async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3000/instruments')
  
      if (response.ok) {
        const data = await response.json();
        dispatch(getInstruments(data));
      } else {
        throw new Error('failed');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });