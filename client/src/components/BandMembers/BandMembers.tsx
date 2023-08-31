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
import "./BandMembers.css";

export default function BandMembers({ profiles, setValue }) {
  const theme = createTheme({
    palette: {
      background: {
        default: " #121212",
      },
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = (login) => {
    navigate(`/profiles/${login}`);
    dispatch(clearBand({}));
    // setValue("one");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
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
            onClick={() => clickHandler(el.User?.login)}
          >
            <CardMedia
              sx={{ height: 275, backgroundColor: "#121212" }}
              image={el.User?.photo ? el.User?.photo : "/user.png"}
              title={el.User?.name}
            />
            <CardContent sx={{ backgroundColor: "#121212" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="white"
              >
                {el.User?.name}
              </Typography>
              <Typography variant="body2" color="grey">
                {el.User?.UserType?.name}
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
