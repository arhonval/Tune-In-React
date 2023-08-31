import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getNewSong } from "../../redux/Thunk/getProfile";

export default function LoadMusic({ user, setValue }) {
  //   const [songName, setSongName] = useState({ name: "" });
  const [songFile, setSongFile] = useState(null);

  //   console.log(songName);
  console.log(songFile);

  const dispatch = useAppDispatch();

  //   const songInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSongName((pre) => ({ ...pre, name: e.target.value }));
  //   };

  const songSubmitHandler = () => {
    const data = new FormData();
    data.append("audio", songFile);
    data.append("name", songFile.name);
    dispatch(getNewSong({ login: user.login, song: data }));
    setValue("one");
  };

  return (
    <>
      <FormControl sx={{ alignItems: "center" }}>
        <input
          type="file"
          name="song"
          id="song"
          style={{ marginTop: "3%" }}
          onChange={(e) => setSongFile(e.target.files[0])}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "3%", width: "50%" }}
          onClick={songSubmitHandler}
        >
          Загрузить
        </Button>
      </FormControl>
    </>
  );
}
