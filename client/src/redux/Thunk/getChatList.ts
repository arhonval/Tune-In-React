import { createAsyncThunk } from "@reduxjs/toolkit";

const getChatList = createAsyncThunk("chat/getChatList", async () => {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get chat failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const getMessages = createAsyncThunk("getMessages", async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/chat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get chat failed");
    }
  } catch (error) {
    alert(error);
  }
});

const getNewMessage = createAsyncThunk("newMessage", async ({ id, body }) => {
  console.log("thunk body===========>", body);

  try {
    const response = await fetch(`http://localhost:3000/chat/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ body }),
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get chat failed");
    }
  } catch (error) {
    alert(error);
  }
});

const getNewChat = createAsyncThunk("newChat", async (id) => {
  console.log(id, '====> id');
  
  try {
    const response = await fetch("http://localhost:3000/chat/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get chat failed");
    }
  } catch (error) {
    alert(error);
  }
});

const getDeleteChat = createAsyncThunk("deleteChat", async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/chat/id`, {
      method: "DELETE",
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get chat failed");
    }
  } catch (error) {
    alert(error);
  }
});

export { getChatList, getMessages, getNewMessage, getNewChat, getDeleteChat };
