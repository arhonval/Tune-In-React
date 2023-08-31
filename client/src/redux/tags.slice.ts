import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        genres: [],
        instruments: [],
      
    },
    reducers: {
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
        getInstruments: (state, action) => {
            state.instruments = action.payload;
        },
       
    },

});

export const { getGenres, getInstruments } = tagsSlice.actions;

export default tagsSlice.reducer;