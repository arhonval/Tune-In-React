import { createSlice } from "@reduxjs/toolkit";
import { fetchUserTypes } from "./Thunk/CreateProfile/getUserTypes";
import { completeUserProfile } from "./Thunk/CreateProfile/updateProfile";

const newUserProfileSlice = createSlice({
    name: 'auth',
    initialState: {
      userTypes: [],
      completedUserProfile: [],
      loading : false
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserTypes.fulfilled, (state, action) => {
          state.userTypes = action.payload; 
      })
      .addCase(completeUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(completeUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.completedUserProfile = action.payload.message;
      })
  },

  });

export default newUserProfileSlice.reducer;
