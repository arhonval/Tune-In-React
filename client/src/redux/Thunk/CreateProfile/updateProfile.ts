import { createAsyncThunk } from "@reduxjs/toolkit";

export const userProfileOne = createAsyncThunk('stepone/updateUser', async (data) => {
  console.log(data);

  try {
    const response = await fetch('http://localhost:3000/newuser/stepone', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error('failed');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const completeUserProfile = createAsyncThunk('steptwo/completeUser',  async(profile) => {
  try {
    const responce = await fetch('http://localhost:3000/newuser/steptwo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile),
      credentials: 'include'
    })
    if (responce.ok) {
      const data = await responce.json();
      console.log(data);
  

      return data;
    } else {
      throw new Error('failed');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
})
