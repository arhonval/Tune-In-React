import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./Thunk/getLogoutUser";

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        authUser: false,
        error: null,
    },
    reducers: {
        loginUser: (state, action) => {
            if (action.payload.err) {
                
                state.authUser = false;
                state.error = action.payload.err;
              } else {
        
                state.user = action.payload;
                state.authUser = true;
                state.error = null;
              }
        },
        registrationUser: (state, action) => {
            if (action.payload.err) {
                
                state.authUser = false;
                state.error = action.payload.err;
              } else {
        
                state.user = action.payload;
                state.authUser = true;
                state.error = null;
              }
        },
        setAuthUser: (state, action) => {
            const status = action.payload.data.status;
    
            if (status === 404) {
                state.authUser = false;
                state.user = null;
            } else {
                state.authUser = true;
                state.user = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
      builder
        // TODO logoutUser
        .addCase(logoutUser.pending, (state) => {
          state.authUser = false;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.authUser = false;
          state.user = [];
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.authUser = false;
          state.error = action.error.message;
        });
    },

});

export const { loginUser, registrationUser, setAuthUser } = authSlice.actions;

export default authSlice.reducer;
