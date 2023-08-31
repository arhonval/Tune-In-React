import { createSlice } from "@reduxjs/toolkit";
import {
  getChatList,
  getDeleteChat,
  getMessages,
  getNewChat,
  getNewMessage,
} from "./Thunk/getChatList";
import { act } from "react-dom/test-utils";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    messages: [],
    dialog: {},
    chatLink: "",
    loading: false,
  },
  reducers: {
    clearChat: (state, action) => {
      state.chatList = [];
      state.messages = [];
      state.dialog = {};
      state.chatLink = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO getChatList
      .addCase(getChatList.pending, (state) => {
        state.loading = true;
        // console.log("get chat");
      })
      .addCase(getChatList.fulfilled, (state, { payload }) => {
        state.chatList = [...payload];
        state.loading = false;
      })
      .addCase(getChatList.rejected, (state) => {
        console.error("ERROR! get chatList");
        state.loading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = [
          ...action.payload.messages.map((el) => {
            return { text: el.body, id: el.sender_id, time: el.createdAt };
          }),
        ];
        state.dialog = { ...action.payload.dialog };
      })
      .addCase(getMessages.rejected, (state) => {
        state.loading = false;
        console.error("error messages");
      })
      .addCase(getNewMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewMessage.fulfilled, (state, action) => {
        state.loading = false;
        // state.messages = [...state.messages, action.payload];
      })
      .addCase(getNewMessage.rejected, (state) => {
        state.loading = false;
        console.error("error new message");
      })
      .addCase(getNewChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = [...state.chatList, action.payload];
        state.dialog = { ...action.payload };
        state.chatLink = `/chat/${action.payload.id}`;
      })
      .addCase(getNewChat.rejected, (state) => {
        state.loading = false;
        console.error("error new chat");
      })
      .addCase(getDeleteChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeleteChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = [
          ...state.chatList.filter((el) => el.id !== action.payload.id),
        ];
      })
      .addCase(getDeleteChat.rejected, (state) => {
        state.loading = false;
        console.error("error delete chat");
      })
      .addDefaultCase(() => {});
  },
});
// export const {
//   filterByCandidate} = adsSlice.actions;

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
