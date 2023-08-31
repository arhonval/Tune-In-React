import axios from "axios";

const fetchProfile = async (login) => {
  try {
    const response = await fetch(`http://localhost:3000/profiles/${login}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const updatePhoto = async ({ login, photo }) => {
  console.log(photo);
  try {
    const newPhoto = await axios.patch(
      `http://localhost:3000/profiles/photo/${login}`,
      photo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response = await fetch(`http://localhost:3000/profiles/${login}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const loadSong = async ({ login, song }) => {
  console.log(song);
  try {
    const newSong = await axios.post(
      `http://localhost:3000/profiles/song/${login}`,
      song,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response = await fetch(`http://localhost:3000/profiles/${login}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const updateUser = async ({ login, info }) => {
  try {
    const response = await fetch(`http://localhost:3000/profiles/${login}`, {
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


export { fetchProfile, updatePhoto, loadSong, updateUser };
