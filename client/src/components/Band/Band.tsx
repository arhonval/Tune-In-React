import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { getBand } from "../../redux/Thunk/getBand";
import BandInfo from "../BandInfo/BandInfo";
import LoadBandMusic from "../LoadBandMusic/LoadBandSong";
import EditBand from "../EditBand/EditBand";
import "./Band.css";
import BandMembers from "../BandMembers/BandMembers";
import { clearBand } from "../../redux/band.slice";
import AddMember from "../AddMember/AddMember";

export default function Band() {
  const [value, setValue] = useState("one");

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    (function () {
      dispatch(getBand(id));
    })();
    return () => dispatch(clearBand({}));
  }, []);

  const bandProfile = useAppSelector((state: RootState) => state.BandReducer);
  console.log("profile:", bandProfile);
  const band = bandProfile.band;
  const bandMembers = bandProfile.bandMembers;
  const loading = bandProfile.loading;
  const notBandMembers = bandProfile.notBandMembers;

  useEffect(() => {
    (function () {
      if (band.name === "Новая группа") {
        setValue("Edit");
      }
    })();
  }, []);

  // const updateProfile = () => {
  //   dispatch(getUpdateProfile({ login: user.login, info: inputs }));
  // };

  //   const authFollows = useAppSelector((state) => state.AuthFollowsReducer);
  //   const authFollowers = authFollows.authFollowers;
  //   const authFollowings = authFollows.authFollowings;
  //   const authFollowersIds = authFollowers.map((el) => el.user_id);
  //   const authFollowingsIds = authFollowings.map((el) => el.follow_id);
  const auth = useAppSelector((state) => state.auth);
  console.log("auth:", auth);
  const isAuth = auth.authUser;
  const authUser = auth.user.data;
  //   console.log("authUser:", authUser);

  //   const subHandler = () => {
  //     dispatch(getNewFollow(user.id));
  //   };

  //   const unsubHandler = () => {
  //     dispatch(getUnsub(user.id));
  //   };

  document.title = band.name;

  return (
    <>
      {!loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="name">{band.name}</h1>
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
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M15 23h-2v-2h2v2m4-2h-2v2h2v-2m-4-4h-2v2h2v-2m-8 4H5v2h2v-2m0-4H5v2h2v-2m12 0h-2v2h2v-2m-4-4h-2v2h2v-2m4 0h-2v2h2v-2m2-4a2 2 0 012 2v12h-2V11H11v12H9v-8H3v8H1v-8a2 2 0 012-2h6v-2a2 2 0 012-2V7a2 2 0 012-2h2V1h2v4h2a2 2 0 012 2v2m-2 0V7h-6v2h6z" />
              </svg>
              <div className="user-city">{band.city}</div>
            </Box>
          </div>
          {value !== "Edit" && authUser?.id === band.admin_id && (
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
                onClick={() => setValue("Add member")}
              >
                Добавить пользователя в группу
              </Button>
            </>
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
              <Tab sx={{ color: "white" }} value="one" label="Группа" />
              <Tab sx={{ color: "white" }} value="two" label="Члены группы" />
            </Tabs>
          )}
          {value === "one" && (
            <BandInfo band={band} setValue={setValue} authUser={authUser} />
          )}
          {value === "two" && (
            <BandMembers profiles={bandMembers} setValue={setValue} />
          )}
          {value === "newSong" && (
            <LoadBandMusic band={band} setValue={setValue} />
          )}
          {value === "Edit" && <EditBand band={band} setValue={setValue} />}
          {value === "Add member" && (
            <AddMember
              setValue={setValue}
              profiles={notBandMembers}
              bandId={band.id}
            />
          )}
        </Box>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
}
