import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, Grid, Button, Container, CssBaseline, ThemeProvider, Typography, createTheme, CircularProgress, FormHelperText, Snackbar, Alert, Autocomplete, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTypes } from '../../redux/Thunk/CreateProfile/getUserTypes';
import { useNavigate } from 'react-router-dom';
import { userProfileOne } from '../../redux/Thunk/CreateProfile/updateProfile';
import { checkUser } from '../../redux/Thunk/checkUser';
import { getSuggestAddress } from '../../redux/Thunk/gelAllBands';

export default function StepOne() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserTypes());
        dispatch(getSuggestAddress());
    }, []);

    const theme = createTheme({
        palette: {
            background: {
                default: ' #121212',
            },
        },
    });

    const names = useSelector(state => state.newUserProfile.userTypes);
    const address = useSelector(state => state.allBands.addresses)
    console.log(address);


    const [city, setLocation] = useState('');
    const [type, setType] = useState('');
    const [telegram, setTelegram] = useState('https://t.me/')



    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleSetProfile = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            city,
            type,
            telegram
        }
        if (!type || !city || !telegram) {
            setOpen(true);
        } else {
            await dispatch(userProfileOne(updatedProfile));
            navigate('/newuser/steptwo');

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Заполните все поля
                </Alert>
            </Snackbar>
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
                    <h1 style={{ color: 'white' }}>Привет! </h1>
                    <h4 style={{ color: 'white' }}>Шаг 1 из 2: Создайте свой профиль</h4>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl focused sx={{ width: 400, input: { color: 'white' } }} color='secondary'>
                                    <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">Тип*</InputLabel>
                                    {names ? (
                                        <Select
                                            sx={{ color: 'white' }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="Type"
                                            name='type'
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : (
                                        <CircularProgress /> // Display a loading indicator
                                    )}
                                    <FormHelperText sx={{ color: 'white' }} >Обязательное поле*</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={address}

                                    onChange={(event, newValue) => setLocation(newValue.label)}
                                    sx={{ width: 400, color: 'white' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Город'
                                            focused
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: 'white' }, // Изменяем цвет текста в поле ввода
                                              }} 

                                        />
                                    )}
                                />


                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ input: { color: 'white' } }}
                                    fullWidth
                                    required
                                    focused
                                    color='secondary'
                                    value={telegram}
                                    id="filled-error-helper-text"
                                    label="Telegram"
                                    margin='dense'
                                    name='telegram'
                                    onChange={(e) => setTelegram(e.target.value)}
                                />                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color='secondary'
                            onClick={handleSetProfile}
                        >
                            Продолжить
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}
