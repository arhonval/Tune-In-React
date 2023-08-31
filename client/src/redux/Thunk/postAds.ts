import { createAsyncThunk } from "@reduxjs/toolkit";

export const postAds = createAsyncThunk("ads/postAds", async (data) => {
  try {
    const response = await fetch("http://localhost:3000/ads/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Post ads failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
