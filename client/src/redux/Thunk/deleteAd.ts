import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteAd = createAsyncThunk("ads/deleteAds", async (data) => {
  try {
    const response = await fetch("http://localhost:3000/ads", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("DELETE ads failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
