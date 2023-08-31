import { createSlice } from "@reduxjs/toolkit";
import {getAllBands, getSuggestAddress} from "./Thunk/gelAllBands";



const initialState = {
    bands: [],
    addresses : [],
    originalArray : [],
    loading: false,
};

const allBandsSlice = createSlice({
    name: "allBands",
    initialState,
    reducers: {
        sortBands: (state, action) => {
            state.bands = action.payload
        },
        setOriginalBands: (state, action) => {
            state.originalArray = action.payload;
        },
        resetFilters: (state) => {
            state.bands = state.originalArray; // Восстанавливаем оригинальный массив
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBands.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBands.fulfilled, (state, action) => {
                state.loading = false;
                state.bands = action.payload;
            
            })
            .addCase(getSuggestAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            
            })

    }
})

export const { sortBands, setOriginalBands, resetFilters} = allBandsSlice.actions
export default allBandsSlice.reducer