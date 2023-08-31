import axios from "axios";

const fetchBand = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/bands/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const updateBandPhoto = async ({ id, photo }) => {
  console.log(photo);
  try {
    const newPhoto = await axios.patch(
      `http://localhost:3000/bands/photo/${id}`,
      photo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response = await fetch(`http://localhost:3000/bands/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const loadBandSong = async ({ id, song }) => {
  try {
    const newSong = await axios.post(
      `http://localhost:3000/bands/song/${id}`,
      song,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response = await fetch(`http://localhost:3000/bands/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const updateBand = async ({ id, info }) => {
  try {
    const response = await fetch(`http://localhost:3000/bands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const createBand = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/bands/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const newMember = async ({ userId, bandId }) => {
  try {
    const response = await fetch("http://localhost:3000/bands/newmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, bandId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

export { fetchBand, updateBandPhoto, loadBandSong, updateBand, createBand, newMember };
