import { createAsyncThunk } from "@reduxjs/toolkit";
import {registrationUser} from '../user.slice';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, {dispatch}) => {
  
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'

      });
      const data = await response.json();
      console.log(data);
      
  
      if (data) {
        dispatch(registrationUser(data));
      } else {
        throw new Error('Registration failed');
      }
   
  });