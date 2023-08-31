import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProfile, getUpdateProfile } from "../../redux/Thunk/getProfile";
import { RootState } from "../../types/reduxTypes";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Tabs,
  Tab,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import LoadMusic from "../LoadMusic/LoadMusic";
import EditProfile from "../EditProfile/EditProfile";
import {
  getAuthFollows,
  getNewFollow,
  getUnsub,
} from "../../redux/Thunk/getAuthFollows";
import "./profile.css";
import Follows from "../Follows/Follows";
import ProfileBands from "../ProfileBands/ProfileBands";
import { getCreatedBand } from "../../redux/Thunk/getBand";
import { clearBand } from "../../redux/band.slice";
import { getNewChat } from "../../redux/Thunk/getChatList";
import { clearChat } from "../../redux/chat.slice";

export default function Profile() {
  const [value, setValue] = useState("one");

  const { login } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    (function () {
      dispatch(clearBand({}));
      dispatch(getProfile(login));
      dispatch(getAuthFollows());
      dispatch(clearChat({}));
    })();
  }, [login]);

  const chat = useAppSelector((state) => state.chatSlice.chatLink);
  console.log("chat:", chat);
  const profile = useAppSelector((state: RootState) => state.ProfileReducer);
  console.log("profile:", profile);
  const user = profile.user;
  console.log("user:", user);
  const genres = profile.genres;
  const instruments = profile.instruments;
  const followings = profile.followings;
  console.log("followings:", followings);
  const followers = profile.followers;
  console.log("followers:", followers);
  const bands = profile.bands;
  const loading = profile.loading;

  // const updateProfile = () => {
  //   dispatch(getUpdateProfile({ login: user.login, info: inputs }));
  // };

  const authFollows = useAppSelector((state) => state.AuthFollowsReducer);
  const authFollowers = authFollows.authFollowers;
  const authFollowings = authFollows.authFollowings;
  const authFollowersIds = authFollowers.map((el) => el.user_id);
  const authFollowingsIds = authFollowings.map((el) => el.follow_id);
  const auth = useAppSelector((state) => state.auth);
  console.log("auth:", auth);
  const isAuth = auth.authUser;
  const authUser = auth.user?.data;
  console.log("authUser:", authUser);

  const subHandler = () => {
    dispatch(getNewFollow(user.id));
  };

  const unsubHandler = () => {
    dispatch(getUnsub(user.id));
  };

  const messageHandler = async () => {
   await dispatch(getNewChat(user.id));
    navigate(chat);
  };

  const newBand = useAppSelector((state) => state.BandReducer.band);
  console.log("newBand:", newBand);

  // useEffect(() => {
  //   (function () {
  //     dispatch(clearBand({}));
  //   })();
  // }, []);

  useEffect(() => {
    // (function () {
    //   if (newBand.id) {
    //     navigate(`/bands/${newBand?.id}`);
    //   }
    // })();
    setTimeout(() => {
      if (newBand.id) {
        navigate(`/bands/${newBand?.id}`);
      } else {
        setValue("one");
      }
    }, 1000);
  }, [newBand]);

  const createBandHandler = () => {
    dispatch(getCreatedBand(user.id));
    // await navigate(`/bands/${newBand?.id}`);
  };

  document.title = user.name;

  return (
    <>
      {!loading ? (
        <>
          <div className="back-url"><img src="/8cEb8kRXi.gif" alt="" /></div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="name">{user.name}</h1>
            <div
              className="meta-info"
              style={{
                display: "flex",
                width: "30%",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                <div className="user-type">{user.UserType?.name}</div>
              </Box>
              <Box sx={{ display: "flex" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M15 23h-2v-2h2v2m4-2h-2v2h2v-2m-4-4h-2v2h2v-2m-8 4H5v2h2v-2m0-4H5v2h2v-2m12 0h-2v2h2v-2m-4-4h-2v2h2v-2m4 0h-2v2h2v-2m2-4a2 2 0 012 2v12h-2V11H11v12H9v-8H3v8H1v-8a2 2 0 012-2h6v-2a2 2 0 012-2V7a2 2 0 012-2h2V1h2v4h2a2 2 0 012 2v2m-2 0V7h-6v2h6z" />
                </svg>
                <div className="user-city">{user.city}</div>
              </Box>
            </div>
            {value !== "Edit" && authUser?.id === user.id && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "2%", width: "20%" }}
                  onClick={() => setValue("Edit")}
                >
                  Изменить
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "2%", width: "20%" }}
                  onClick={createBandHandler}
                >
                  Создать группу
                </Button>
              </>
            )}
            {authUser?.id !== user.id &&
              authFollowingsIds.includes(user.id) && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: "2%", width: "20%" }}
                  onClick={unsubHandler}
                >
                  Отписаться
                </Button>
              )}
            {authUser?.id !== user.id &&
              !authFollowingsIds.includes(user.id) && (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "2%", width: "20%" }}
                  onClick={subHandler}
                >
                  Подписаться
                </Button>
              )}
            {authUser?.id !== user.id && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "2%", width: "20%" }}
                onClick={messageHandler}
              >
                Написать сообщение
              </Button>
            )}
            {value !== "Edit" && (
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="scrollable"
                allowScrollButtonsMobile
                centered
                sx={{ width: "75%", marginTop: "4%" }}
              >
                <Tab sx={{ color: "white" }} value="one" label="Профиль" />
                <Tab sx={{ color: "white" }} value="two" label="Подписки" />
                <Tab sx={{ color: "white" }} value="three" label="Группы" />
              </Tabs>
            )}
            {value === "one" && (
              <ProfileInfo
                user={user}
                genres={genres}
                instruments={instruments}
                setValue={setValue}
                authUser={authUser}
              />
            )}
            {value === "two" && (
              <Follows profiles={followings} setValue={setValue} />
            )}
            {value === "three" && (
              <ProfileBands bands={bands} setValue={setValue} />
            )}
            {value === "newSong" && (
              <LoadMusic user={user} setValue={setValue} />
            )}
            {value === "Edit" && (
              <EditProfile
                user={user}
                genres={genres}
                instruments={instruments}
                setValue={setValue}
              />
            )}
          </Box>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
}
