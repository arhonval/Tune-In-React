import { Alert, AlertTitle, Box, Button, Chip, Snackbar, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenresFetch, getIntrumentsFetch } from '../../redux/Thunk/CreateProfile/getTags';
import { completeUserProfile } from '../../redux/Thunk/CreateProfile/updateProfile';
import { useNavigate } from 'react-router-dom';
import { registrationUser } from '../../redux/user.slice';
import { checkUser } from '../../redux/Thunk/checkUser';

export default function StepTwo() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.auth.authUser);
    if (!isAuthenticated) {
        navigate('/');
    }

    useEffect(() => {
        dispatch(getGenresFetch())
    }, []);

    useEffect(() => {
        dispatch(getIntrumentsFetch())
    }, []);

    useEffect(() => {
        dispatch(checkUser());
    }, []);

    const genres = useSelector(state => state.tags.genres)

    const instruments = useSelector(state => state.tags.instruments)



    const [clickedGenres, setClickedGenres] = useState([]);
    const [clickedInstruments, setClickedInstruments] = useState([]);
    const [about, setAbout] = useState('');

    // const [profile, setProfile] = useState({
    //     about: '',
    //     clickedGenres: [],
    //     clickedInstruments: []
    // });

    const handleChipClick = (genre) => {
        if (clickedGenres.includes(genre)) {
            setClickedGenres(prevChips => prevChips.filter(chip => chip !== genre));
        } else {
            setClickedGenres(prevChips => [...prevChips, genre]);
        }
    };

    const handleInstrumentClick = (instrument) => {
        if (clickedInstruments.includes(instrument)) {
            setClickedInstruments(prevChips => prevChips.filter(chip => chip !== instrument));
        } else {
            setClickedInstruments(prevChips => [...prevChips, instrument]);
        }
    };

    const user = useSelector(state => state.auth.user.data);

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleSave = async () => {
        const updatedProfile = {
            about,
            clickedGenres,
            clickedInstruments
        };

        console.log(updatedProfile);

        if (!about || !clickedGenres || !clickedInstruments) {
            setOpen(true);
        } else {
            await dispatch(completeUserProfile(updatedProfile));
            navigate(`/profiles/${user.login}`);
        }

    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Заполните все поля
                </Alert>
            </Snackbar>
            {/* {showAlert && <Stack sx={{ width: '30%' }} spacing={2}>
                <Alert className='alert'
                    action={
                        <Button color="inherit" size="small" onClick={() =>setShowAlert(false)}>
                            UNDO
                        </Button>
                    }
                > {message}
                </Alert>
            </Stack>} */}

            <div className='stepTwoBody'>
                <h1>Привет! </h1>
                <h4>Шаг 2 из 2: Детали профиля</h4>

                <div className='container'>
                    <label className='headText' htmlFor="aboutinput">Расскажи о себе</label>
                    <TextField
                        sx={{ input: { color: 'white' }, }}
                        className='input'
                        color="secondary"
                        id='aboutInput'
                        multiline
                        value={about}
                        rows={30}
                        
                        onChange={(e) => setAbout(e.target.value)}
                        inputProps={{ style: { color: "white", height: '200px' },  }}
                    />
                </div>


                <div className='container'>
                    <span className='headText'>Жанры</span>
                    <div className='tags'>
                        {genres?.map((el) => (
                            <Chip
                                variant={clickedGenres.includes(el.genre) ? 'filled' : 'outlined'}
                                color='secondary'
                                key={el.id}
                                label={el.genre}
                                clickable onClick={() => handleChipClick(el.genre)} />
                        ))}
                    </div>
                    <br />
                    <span className='headText'>Инструменты</span>
                    <div className='tags'>
                        {instruments?.map((el) => (
                            <Chip
                                variant={clickedInstruments.includes(el.instrument) ? 'filled' : 'outlined'}
                                color="secondary"
                                key={el.id}
                                label={el.instrument}
                                onClick={() => handleInstrumentClick(el.instrument)}
                                clickable />
                        ))}
                    </div>
                </div>
                <br />
                <Button
                    size='medium'
                    color="secondary"
                    variant="contained"
                    sx={{
                        margin: '20px 0 20px 0'
                    }}
                    onClick={() => handleSave()}
                >Сохранить</Button>

            </div>
        </>
    )
}

