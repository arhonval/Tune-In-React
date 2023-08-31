import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles, getAlluserGenres } from '../../redux/Thunk/getAllProfiles';
import { useNavigate } from 'react-router-dom';
import ProfilesFilter from './ProfilesFilter'
import './AllProfiles.css'
import { getGenresFetch, getIntrumentsFetch } from '../../redux/Thunk/CreateProfile/getTags';
import { fetchUserTypes } from '../../redux/Thunk/CreateProfile/getUserTypes';


export default function AllProfiles() {


    const theme = createTheme({
        palette: {
            background: {
                default: ' #121212',

            },
        },
    })


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIntrumentsFetch())
    }, []);

    useEffect(() => {
        dispatch(getGenresFetch())
    }, [dispatch]);
  
    useEffect(() => {
        dispatch(fetchUserTypes());
    }, []);

    const profiles = useSelector(state => state.allProfiles.profiles)
    console.log(profiles);


    return (

        <ThemeProvider theme={theme} >
    
            <Container className='mainContainer' component="main" sx={{ backgroundColor: ' #121212', }}>
                <CssBaseline />
                <Box
                    sx={{
                        margin: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <h1 style={{ color: 'white' }}>Профили</h1>
                    <h4 style={{ color: 'grey' }}>Знакомьтесь с музыкантами, готовыми к совместному творчеству.</h4>
                <ProfilesFilter />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '40px', justifyContent: 'space-between',
                    
                }}>
                    {profiles ? (
                        profiles.map((el) => (
                            <Card key={el.id} sx={{  backgroundColor: '#121212', width: 260}} onClick={() => navigate(`/profiles/${el.login}`)}>
                                <CardMedia
                                
                                    sx={{ height: 260,  backgroundColor: '#121212', width: '100%', }}
                                    image={el.photo ? el.photo : '/user.png'}
                                    title={el.name}
                                    
                                   
                                    
                                />
                                <CardContent sx={{ backgroundColor: ' #121212;' }}>
                                    <Typography gutterBottom variant="h6" component="div" color='grey'>
                                        {el.name}
                                    </Typography>
                                    <Typography variant="body2" color="grey">
                                        {el.UserType?.name}
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        ))
                    ) : (
                        <span>Loading profiles...</span>
                    )}
                </Box>
            </Container>

        </ThemeProvider>
    )


}
