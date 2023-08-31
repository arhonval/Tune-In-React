import { createSlice } from "@reduxjs/toolkit";
import { getAllProfiles, getAlluserGenres } from "./Thunk/getAllProfiles";



const initialState = {
    profiles: [],
    originalProfiles: [],
    loading: false,
};

const allprofileSlice = createSlice({
    name: "allProfiles",
    initialState,
    reducers: {
        sortProfiles: (state, action) => {
            state.profiles = action.payload
        },
        setOriginalProfiles: (state, action) => {
            state.originalProfiles = action.payload;
        },
        resetFilters: (state) => {
            state.profiles = state.originalProfiles; // Восстанавливаем оригинальный массив
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
            
            })
            .addCase(getAlluserGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
            })
           
           

    }
})

export const { sortProfiles, setOriginalProfiles, resetFilters } = allprofileSlice.actions;
export default allprofileSlice.reducer