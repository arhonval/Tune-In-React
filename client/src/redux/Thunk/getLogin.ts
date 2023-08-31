import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../user.slice";

export const authenticateUser = createAsyncThunk('auth/authenticateUser', async (credentials, { dispatch}) => {
 
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
    const data = await response.json();
    console.log(data);
    
  
    if (data) {
      dispatch(loginUser(data));
    } else {
      throw new Error('Registration failed');
    }
});



