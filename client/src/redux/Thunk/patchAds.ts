import { createAsyncThunk } from "@reduxjs/toolkit";

export const patchAds = createAsyncThunk("ads/patchAds", async (data) => {
  try {
    const response = await fetch(`http://localhost:3000/ads/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.post),
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Patch ads failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
