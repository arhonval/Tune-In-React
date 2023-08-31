import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAdds = createAsyncThunk("ads/getAds", async () => {
  try {
    const response = await fetch("http://localhost:3000/ads", {
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
      throw new Error("Get ads failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
