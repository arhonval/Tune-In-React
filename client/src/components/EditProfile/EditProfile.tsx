import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserTypes } from "../../redux/Thunk/CreateProfile/getUserTypes";
import {
  getGenresFetch,
  getIntrumentsFetch,
} from "../../redux/Thunk/CreateProfile/getTags";
import "./EditProfile.css";
import { getNewPhoto, getUpdateProfile } from "../../redux/Thunk/getProfile";
import { checkUser } from "../../redux/Thunk/checkUser";

export default function EditProfile({ user, genres, instruments, setValue }) {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState(null);
  console.log("photo:", photo);

  const cities = useAppSelector((state) => state.allBands.addresses);

  const sendFile = async () => {
    console.log("send");
    const data = new FormData();
    data.append("photo", photo);
    await dispatch(getNewPhoto({ login: user.login, photo: data }));
    // setTimeout(() => {
    //   dispatch(checkUser());
    // }, 1000);
    await dispatch(checkUser());
  };

  const initState = {
    name: user.name || "",
    city: user.city || "",
    about: user.about || "",
    type: user.UserType?.name || "",
    telegram: user.telegram || "",
    insta: user.insta || "",
    youtube: user.youtube || "",
    soundcloud: user.soundcloud || "",
  };

  const [inputs, setInputs] = useState(initState);
  console.log("inputs:", inputs);

  useEffect(() => {
    dispatch(fetchUserTypes());
    dispatch(getGenresFetch());
    dispatch(getIntrumentsFetch());
  }, []);

  const inputsHandler = (e) => {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const genresIds = genres.map((el) => el.genre_id);
  // console.log("genresIds:", genresIds);
  const instrumentsIds = instruments.map((el) => el.instrument_id);
  // console.log("instrumentsIds:", instrumentsIds);

  const [customGenres, setCustomGenres] = useState([...genresIds]);
  console.log("customGenres:", customGenres);
  const [customInstruments, setCustomInstruments] = useState([
    ...instrumentsIds,
  ]);
  console.log("customInstruments:", customInstruments);

  const updateProfile = () => {
    dispatch(
      getUpdateProfile({
        login: user.login,
        info: { inputs, customGenres, customInstruments },
      })
    );
    setValue("one");
  };

  const types = useAppSelector((state) => state.newUserProfile.userTypes);
  const allGenres = useAppSelector((state) => state.tags.genres);
  const allInstruments = useAppSelector((state) => state.tags.instruments);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "75%",
          justifyContent: "space-between",
          marginTop: "5%",
        }}
      >
        {!user.photo ? (
          <Box
            sx={{
              backgroundColor: "#282828",
              width: "45%",
              borderStyle: "dashed",
            }}
          >
            <Box
              sx={{
                margin: "3%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="3em"
                width="3em"
              >
                <path d="M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z" />
              </svg>
              <div>
                Ваш профиль не будет виден другим пользователям до тех пор, пока
                вы не загрузите фотографию
              </div>
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={{ marginTop: "3%", marginBottom: "3%" }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "2%", width: "30%" }}
                onClick={sendFile}
              >
                Загрузить
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={user.photo} alt="avatar" />
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ marginTop: "3%", marginBottom: "3%" }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: "2%", width: "40%" }}
              onClick={sendFile}
            >
              Поменять фотографию
            </Button>
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
          <TextField
            id="name"
            name="name"
            label="Имя"
            value={inputs.name}
            onChange={inputsHandler}
            focused
            placeholder="Иванов Иван"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ width: "100%" }}
          />
          <TextField
            id="city"
            name="city"
            label="Город"
            value={inputs.city}
            onChange={inputsHandler}
            focused
            placeholder="Москва"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ width: "100%", marginTop: "5%" }}
          />
          {/* <Autocomplete
            id="city"
            name="city"
            label="Город"
            value={inputs.city}
            onChange={inputsHandler}
            focused
            placeholder="Москва"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ width: "100%", marginTop: "5%" }}
            options={cities}
            renderInput={(params) => <TextField {...params} label="Города" />}
          /> */}
          <TextField
            id="outlined-multiline-static"
            name="about"
            label="О себе"
            multiline
            rows={15}
            value={inputs.about}
            onChange={inputsHandler}
            focused
            placeholder="Расскажи нам немного о себе, о своих достижениях, стремлениях, предстоящих концертах, или чего бы ты хотел получить будучи членом нашего сообщества"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ width: "100%", marginTop: "5%" }}
          />
        </Box>
      </Box>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inputs.type}
        onChange={inputsHandler}
        label="Type"
        name="type"
        sx={{
          width: "75%",
          marginTop: "3%",
          color: "white",
        }}
      >
        {types.map((el) => (
          <MenuItem key={`t${el}`} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>

      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <h2>Жанры</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "60%" }}>
            {allGenres.map((el) =>
              customGenres.includes(el.id) ? (
                <Chip
                  color="secondary"
                  key={`g${el.id}`}
                  label={el.genre}
                  sx={{ margin: "1%" }}
                  onClick={() =>
                    setCustomGenres((pre) => pre.filter((id) => id !== el.id))
                  }
                />
              ) : (
                <Chip
                  color="secondary"
                  variant="outlined"
                  key={`g${el.id}`}
                  label={el.genre}
                  sx={{ margin: "1%" }}
                  onClick={() => setCustomGenres((pre) => [...pre, el.id])}
                />
              )
            )}
          </Box>
        </Box>
        <Box>
          <h2>Инструменты</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {allInstruments.map((el) =>
              customInstruments.includes(el.id) ? (
                <Chip
                  color="secondary"
                  key={`i${el.id}`}
                  label={el.instrument}
                  sx={{ margin: "1%" }}
                  onClick={() =>
                    setCustomInstruments((pre) =>
                      pre.filter((id) => id !== el.id)
                    )
                  }
                />
              ) : (
                <Chip
                  color="secondary"
                  variant="outlined"
                  key={`i${el.id}`}
                  label={el.instrument}
                  sx={{ margin: "1%" }}
                  onClick={() => setCustomInstruments((pre) => [...pre, el.id])}
                />
              )
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "75%" }}>
        <h2>Социальные сети</h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="telegram"
              name="telegram"
              label="Telegram"
              value={inputs.telegram}
              onChange={inputsHandler}
              focused
              placeholder="https://t.me/tunein"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ width: "125%" }}
            />
            <TextField
              id="insta"
              name="insta"
              label="Instagram"
              value={inputs.insta}
              onChange={inputsHandler}
              focused
              placeholder="www.instagram.com/tunein"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ width: "125%", marginTop: "5%" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="youtube"
              name="youtube"
              label="YouTube"
              value={inputs.youtube}
              onChange={inputsHandler}
              focused
              placeholder="https://youtube.com/tunein"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ width: "125%" }}
            />
            <TextField
              id="soundcloud"
              name="soundcloud"
              label="SoundCloud"
              value={inputs.soundcloud}
              onChange={inputsHandler}
              focused
              placeholder="https://soundcloud.com/tunein"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{ width: "125%", marginTop: "5%" }}
            />
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: "2%", width: "20%", marginBottom: "15%" }}
        onClick={updateProfile}
      >
        Сохранить изменения
      </Button>
    </>
  );
}
