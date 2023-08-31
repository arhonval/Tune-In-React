import React, { useEffect } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
import {getAllBands , getSuggestAddress } from '../../redux/Thunk/gelAllBands'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BandsFilter from './BandsFilter'

export default function AllBands() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllBands());
    }, [])
    
    useEffect(() => {
        dispatch(getSuggestAddress());

    }, [dispatch])


    const bands = useSelector(state => state.allBands.bands)
    console.log(bands);
    

    const theme = createTheme({
        palette: {
            background: {
                default: ' #121212',

            },
        },
    })
    

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
                    <h1 style={{ color: 'white' }}>Группы</h1>
                    <h4 style={{ color: 'grey' }}>Знакомьтесь с группами, готовыми к совместному творчеству.</h4>
                    <BandsFilter/>
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '40px', justifyContent: 'space-between',
                    
                }}>
                    {bands ? (
                        bands?.map((el) => (
                            <Card key={el.id} sx={{  backgroundColor: '#121212', width: 260}} onClick={() => navigate(`/bands/${el.id}`)}>
                                <CardMedia
                                
                                    sx={{ height: 260,  backgroundColor: '#121212', width: '100%' }}
                                    image={el.photo ? el.photo : '/user.png'}
                                    title={el.name}
                                   
                                    
                                />
                                <CardContent sx={{ backgroundColor: ' #121212;' }}>
                                    <Typography gutterBottom variant="h6" component="div" color='grey'>
                                        {el.name}
                                    </Typography>
                                    <Typography variant="body2" color="grey">
                                        {el.city}
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        ))
                    ) : (
                        <p>Loading bands...</p>
                    )}
                </Box>
            </Container>

        </ThemeProvider>
  )
}
