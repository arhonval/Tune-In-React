import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk('logout/logoutUser', async () => {
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
       credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});



