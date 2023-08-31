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


export default function ProfileBands({ bands, setValue }) {
  const theme = createTheme({
    palette: {
      background: {
        default: " #121212",
      },
    },
  });

  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/bands/${id}`);
    setValue("one");
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
      {bands.length ? (
        bands.map((el) => (
          <Card
            key={el.id}
            sx={{ width: "15%", backgroundColor: "#121212" }}
            onClick={() => clickHandler(el.band_id)}
          >
            <CardMedia
              sx={{ height: 275, backgroundColor: "#121212" }}
              image={el.Band?.photo ? el.Band?.photo : "/user.png"}
              title={el.Band?.name}
            />
            <CardContent sx={{ backgroundColor: "#121212" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="white"
              >
                {el.Band?.name}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Групп нет</p>
      )}
    </Box>
  );
}
