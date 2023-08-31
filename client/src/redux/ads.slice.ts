import { createSlice } from "@reduxjs/toolkit";
import { getAdds } from "./Thunk/getAdds";
import { postAds } from "./Thunk/postAds";
import { patchAds } from "./Thunk/patchAds";
import { deleteAd } from "./Thunk/deleteAd";


const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    adsCopy: [],
    statusSort: 1,
  },
  reducers: {
    filterByGroup: (state) => {
      if (!state.statusSort) {
        state.ads = state.adsCopy
          .filter((el) => el.type_id == 1)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        return;
      }
      state.ads = state.adsCopy
        .filter((el) => el.type_id == 1)
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    },

    filterByCandidate: (state) => {
      if (!state.statusSort) {
        state.ads = state.adsCopy
          .filter((el) => el.type_id == 2)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        return;
      }
      state.ads = state.adsCopy.filter((el) => el.type_id == 2);
    },

    sortByDateAp: (state, action) => {
      state.ads = state.ads.sort(
        (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
      );
      state.statusSort = action.payload.val;
    },

    sortByDateDown: (state, action) => {
      state.ads = state.ads.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      state.statusSort = action.payload.val;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO getAdds
      .addCase(getAdds.pending, (state) => {
        // console.log("get ads");
      })
      .addCase(getAdds.fulfilled, (state, { payload }) => {
        if (!state.statusSort) {
          state.ads = payload.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          state.adsCopy = [...state.ads];
        }
        state.ads = [...payload];
        state.adsCopy = [...payload];
      })
      .addCase(getAdds.rejected, (state) => {
        console.error("ERROR! get ads");
      })
      // TODO postAdds
      .addCase(postAds.pending, (state) => {
        // console.log("postAdds ads");
      })
      .addCase(postAds.fulfilled, (state, { payload }) => {
        state.ads.push(payload);
        state.adsCopy.push(payload);
      })
      .addCase(postAds.rejected, (state) => {
        console.error("ERROR! post ads");
      })
      // TODO patchAds
      .addCase(patchAds.pending, (state) => {
        // console.log("patchAds ads");
      })
      .addCase(patchAds.fulfilled, (state, { payload }) => {
        console.log("----------------", payload);

        state.ads = state.ads.map((el) => {
          if (el.id === payload.id) el = payload;
          return el;
        });
        state.adsCopy = state.adsCopy.map((el) => {
          if (el.id === payload.id) el = payload;
          return el;
        });
      })
      .addCase(patchAds.rejected, (state) => {
        console.error("ERROR! post ads");
      })
      // TODO deleteAd
      .addCase(deleteAd.pending, (state) => {})
      .addCase(deleteAd.fulfilled, (state, { payload }) => {
        console.log("----------------", payload);

        state.ads = state.ads.filter((el) => el != payload.id);
        state.adsCopy = state.adsCopy.filter((el) => el != payload.id);
      })
      .addCase(deleteAd.rejected, (state) => {
        console.error("ERROR! delete ads");
      });
  },
});
export const {
  filterByCandidate,
  filterByGroup,
  sortByDateAp,
  sortByDateDown,
} = adsSlice.actions;
export default adsSlice.reducer;
