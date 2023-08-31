import { createAsyncThunk } from '@reduxjs/toolkit';
import {setAuthUser} from '../user.slice';

export const checkUser = createAsyncThunk('user/checkUser', async (_, { dispatch }) => {
    try {
        const response = await fetch('http://localhost:3000/checkUser', {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);

        dispatch(setAuthUser({data}));
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
});
