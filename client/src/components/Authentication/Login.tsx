import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Container, CssBaseline, Snackbar, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../../redux/Thunk/getLogin';
import { Await, useNavigate } from 'react-router-dom';
import './Authentication.css'
import { checkUser } from "../../redux/Thunk/checkUser";
import Grid from '@mui/material/Grid';
import GoogleAuth from './GoogleAuth';
import axios from 'axios';
import { loginUser } from '../../redux/user.slice';


export default function Login(props) {


  const theme = createTheme({
    palette: {
      background: {
        default: ' #121212',
      },
    },
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const isAuthenticated = useSelector(state => state.auth.authUser);
  console.log(isAuthenticated);

  const errorMessage = useSelector(state => state.auth.error);
  console.log(errorMessage);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (isAuthenticated) {
    navigate('/');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    if(!email || !password){
      setOpen(true)
    }else{

      await dispatch(authenticateUser(credentials));
      await dispatch(checkUser());
      setOpen(true);
    }
  };

  const handleGoogleLogin = () => {
 
    window.location.href = 'http://localhost:3000/auth/google';
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
              {errorMessage || 'Заполните все поля!'}
            </Alert>
          </Snackbar>

          <Typography component="h1" variant="h5" color='white'>
            ВХОД
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                <TextField
                  sx={{ input: { color: 'white' } }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  type='email'
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  label="E-mail"
                  focused
                  color='secondary'
                  value={email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ input: { color: 'white' } }}
                  required
                  fullWidth
                  type="password"
                  label="Пароль"
                  name="lastName"
                  autoComplete="family-name"
                  focused
                  value={password}
                  color='secondary'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
              onClick={handleLogin}
            >
              Войти
            </Button>
            

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Нет аккаунта? Зарегистрироваться
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  )
}


