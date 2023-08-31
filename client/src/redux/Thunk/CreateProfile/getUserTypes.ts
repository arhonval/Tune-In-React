import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserTypes = createAsyncThunk('userTypes/getUserTypes', async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/userTypes')
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data
      } else {
        throw new Error('failed');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });