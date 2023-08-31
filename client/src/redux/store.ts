import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./profile.slice";
import UserReducer from "./user.slice";
import NewUserProfileReducer from "./newUserProfile.slice";
import TagsReducer from "./tags.slice";
import adsSlice from "./ads.slice";
import chatSlice from "./chat.slice";
import AuthFollowsReducer from "./authFollows.slice";
import AllProfiles from "./allProfiles.slice";
import BandReducer from "./band.slice";
import AllBandsReducer from "./allBands.slice";

const store = configureStore({
  reducer: {
    ProfileReducer,
    AuthFollowsReducer,
    adsSlice,
    chatSlice,
    auth: UserReducer,
    newUserProfile: NewUserProfileReducer,
    tags: TagsReducer,
    allProfiles: AllProfiles,
    BandReducer,
    allBands: AllBandsReducer
  },
});

export default store;
