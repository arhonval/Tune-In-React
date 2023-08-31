import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProfiles,
  getAlluserGenres,
} from "../../redux/Thunk/getAllProfiles";
import { useNavigate } from "react-router-dom";
import ProfilesFilter from "./ProfilesFilter";
import { getGenres } from "../../redux/tags.slice";
import {
  getGenresFetch,
  getIntrumentsFetch,
} from "../../redux/Thunk/CreateProfile/getTags";
import { fetchUserTypes } from "../../redux/Thunk/CreateProfile/getUserTypes";
import { useAppDispatch } from "../../redux/hooks";
import { clearBand } from "../../redux/band.slice";
import { getNewMember } from "../../redux/Thunk/getBand";

export default function AddMember({ profiles, setValue, bandId }) {
  const theme = createTheme({
    palette: {
      background: {
        default: " #121212",
      },
    },
  });

  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = (userId, bandId) => {
    dispatch(getNewMember({ userId, bandId }));
    setValue("two");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        width: "100%",
        marginTop: "2%",
      }}
    >
      {profiles.length ? (
        profiles.map((el) => (
          <Card
            key={el.id}
            sx={{ width: "15%", backgroundColor: "#121212" }}
            onClick={() => clickHandler(el.id, bandId)}
          >
            <CardMedia
              sx={{ height: 275, backgroundColor: "#121212" }}
              image={el.photo ? el.photo : "/user.png"}
              title={el.name}
            />
            <CardContent sx={{ backgroundColor: "#121212" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="white"
              >
                {el.name}
              </Typography>
              <Typography variant="body2" color="grey">
                {el.UserType?.name}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Здесь никого нет</p>
      )}
    </Box>
  );
}
