import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Link, Grid, Button, Container, CssBaseline, ThemeProvider, Typography, createTheme, Snackbar, Alert, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/Thunk/getRegister';
import { checkUser } from "../../redux/Thunk/checkUser";

export default function Register() {

  const theme = createTheme({
    palette: {
      background: {
        default: ' #121212',
      },
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    login: '',
  });

  const isAuthenticated = useSelector(state => state.auth.authUser);

  if (isAuthenticated) {
    navigate('/');
  }


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserData(prevData => ({ ...prevData, [id]: value }));
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!userData.name || !userData.email || !userData.login || !userData.password){
      setOpen(true)
    }else{

      await dispatch(registerUser(userData));
      await dispatch(checkUser());
       navigate('/newuser/stepone');
  
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: ' #121212;' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Заполните все поля!
            </Alert>
          </Snackbar>

          <Typography component="h1" variant="h5" color='white'>
            РЕГИСТРАЦИЯ
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="name"
                  value={userData.name}
                  label="ФИО"
                  focused
                  color='secondary'
                  sx={{ input: { color: 'white' } }}
                  onChange={(e) => handleInputChange(e)}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Э-почта"
                  value={userData.email}
                  autoComplete="family-name"
                  focused
                  color='secondary'
                  sx={{ input: { color: 'white' } }}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  value={userData.login}
                  autoComplete="email"
                  focused
                  color='secondary'
                  sx={{ input: { color: 'white' } }}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Пароль"
                  type="password"
                  id="password"
                  value={userData.password}
                  autoComplete="new-password"
                  focused
                  color='secondary'
                  sx={{ input: { color: 'white' } }}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
              onClick={handleRegister}
            >
              Сохранить

            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Уже есть аккаунт?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  )
}


