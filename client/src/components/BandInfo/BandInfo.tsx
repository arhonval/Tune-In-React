import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import StopIcon from "@mui/icons-material/Stop";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getNewPhoto } from "../../redux/Thunk/getProfile";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Link } from "react-router-dom";
import { getNewBandPhoto } from "../../redux/Thunk/getBand";

export default function BandInfo({ band, setValue, authUser }) {
  const [photo, setPhoto] = useState(null);
  const [playSong, setPlaySong] = useState("");
  console.log("photo:", photo);

  const dispatch = useAppDispatch();

  const sendFile = () => {
    console.log("send");
    const data = new FormData();
    data.append("photo", photo);
    dispatch(getNewBandPhoto({ id: band.id, photo: data }));
  };

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
        {!band.photo ? (
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
                padding: "5%",
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
              {authUser?.id === band.admin_id ? (
                <div>
                  Ваш профиль не будет виден другим пользователям до тех пор,
                  пока вы не загрузите фотографию
                </div>
              ) : (
                <div>Фотография не загружена</div>
              )}
              {authUser?.id === band.admin_id && (
                <>
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
                </>
              )}
            </Box>
          </Box>
        ) : (
          <img src={band.photo} alt="avatar" style={{ width: "45%" }} />
        )}
        {band.about ? (
          <Box
            sx={{
              width: "40%",
              // backgroundColor: "#282828",
              padding: "2%",
              maxHeight: "50vh",
              borderColor: "grey",
            }}
          >
            <div
              className="user-about"
              style={{ overflow: "auto", height: "100%" }}
            >
              {band.about}
            </div>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "#282828",
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "5%",
              borderStyle: "dashed",
            }}
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="3em"
              width="3em"
            >
              <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" />
            </svg>
            {authUser?.id === band.admin_id ? (
              <>
                <div>
                  Оставьте свою биографию связанной с музыкой и поделитесь
                  своими историями о том, как вы стали музыкантом и как музыка
                  стала частью вашей жизни. Пусть ваша биография станет
                  источником вдохновения и поддержки для других людей, которые
                  также связаны с музыкой
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "2%" }}
                  onClick={() => setValue("Edit")}
                >
                  Оставить биографию
                </Button>
              </>
            ) : (
              <div>Биография отсутствует</div>
            )}
          </Box>
        )}
      </Box>

      <div className="profile__social">
        <ul>
          {band.telegram && (
            <li>
              <a href={band.telegram}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="bi bi-telegram"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                </svg>
              </a>
            </li>
          )}
          {band.insta && (
            <li>
              <a href={band.insta}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
            </li>
          )}
          {band.youtube && (
            <li>
              <a href={band.youtube}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </a>
            </li>
          )}
          {band.soundcloud && (
            <li>
              <a href={band.soundcloud}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0v24h24v-24h-24zm4.667 15.524c-.405-.365-.667-.903-.667-1.512 0-.608.262-1.146.667-1.512v3.024zm1.333.476c-.243 0-.369.003-.667-.092v-3.792c.316-.101.465-.097.667-.081v3.965zm1.333 0h-.666v-3.778l.206.121c.091-.375.253-.718.461-1.023v4.68zm1.334 0h-.667v-5.378c.206-.154.426-.286.667-.377v5.755zm1.333 0h-.667v-5.905c.251-.027.328-.046.667.006v5.899zm1.333 0h-.667v-5.7l.253.123c.119-.207.261-.395.414-.572v6.149zm6.727 0h-6.06v-6.748c.532-.366 1.16-.585 1.841-.585 1.809 0 3.275 1.494 3.411 3.386 1.302-.638 2.748.387 2.748 1.876 0 1.143-.869 2.071-1.94 2.071z" />
                </svg>
              </a>
            </li>
          )}
        </ul>
      </div>

      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%", marginBottom: "15%" }}>
          <h2>Песни</h2>
          {band.SongBands?.length > 0 && (
            <>
              <div
                className="music-list"
                style={{
                  display: "none",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <List sx={{ width: "100%" }}>
                  {band.SongBands?.map((el) => (
                    <ListItem>
                      <ListItemIcon>
                        {playSong !== el.song_path ? (
                          <PlayCircleOutlineIcon
                            sx={{ color: "white", cursor: "pointer" }}
                            onClick={() => setPlaySong(el.song_path)}
                          />
                        ) : (
                          <StopCircleOutlinedIcon
                            sx={{ color: "white", cursor: "pointer" }}
                            onClick={() => setPlaySong("")}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={el.name} />
                    </ListItem>
                  ))}
                </List>
                {/* {playSong && (
                  <AudioPlayer
                    style={{
                      position: "fixed",
                      bottom: 0,
                      backgroundColor: "#c52929f0",
                      zIndex: 900,
                    }}
                    autoPlay
                    src={playSong}
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                  />
                )} */}
              </div>
              <Box
                sx={{
                  display: "flex",
                  marginBottom: "5%",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                {band.SongBands?.map((el) => (
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "20%",
                      alignItems: "center",
                      margin: "1%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // sx={{ width: 151 }}
                      image="../../../public/musicicon.jpg"
                      alt="Song Icon"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {el.name}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        {playSong !== el.song_path ? (
                          <IconButton
                            aria-label="play/pause"
                            onClick={() => setPlaySong(el.song_path)}
                          >
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="play/pause"
                            onClick={() => setPlaySong("")}
                          >
                            <StopIcon sx={{ height: 38, width: 38 }} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
              {playSong && (
                <AudioPlayer
                  style={{
                    position: "fixed",
                    bottom: 0,
                    backgroundColor: "#c52929f0",
                    zIndex: 900,
                    left: 0,
                  }}
                  autoPlay
                  src={playSong}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
                />
              )}
            </>
          )}
          {authUser?.id !== band.admin_id && band.SongBands?.length === 0 && (
            <Box
              sx={{
                backgroundColor: "#282828",
              }}
            >
              <Box
                sx={{
                  padding: "5%",
                  borderStyle: "dashed",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 01416 154v22"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0123-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 00-12.6-9.61L204 102a16.48 16.48 0 00-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
                  />
                </svg>
                <div>Песни отсутствуют</div>
              </Box>
            </Box>
          )}
          {authUser?.id === band.admin_id && (
            <Box
              sx={{
                backgroundColor: "#282828",
              }}
            >
              <Box
                sx={{
                  padding: "5%",
                  borderStyle: "dashed",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 01416 154v22"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0123-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 00-12.6-9.61L204 102a16.48 16.48 0 00-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
                  />
                </svg>
                <div>
                  Добавьте песни в ваш профиль. Мы уверены, у вас есть, чем
                  поделиться!
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "2%", width: "20%" }}
                  onClick={() => setValue("newSong")}
                >
                  Загрузить песню
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
