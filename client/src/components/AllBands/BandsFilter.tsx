import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SortIcon from '@mui/icons-material/Sort';
import Person2Icon from '@mui/icons-material/Person2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Autocomplete, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, colors } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUserInstruments, getAlluserGenres } from '../../redux/Thunk/getAllProfiles';
import { setOriginalBands, sortBands, resetFilters } from '../../redux/allBands.slice';





function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>

                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [location, setLocation] = useState('');


    const handleChange = (event, newValue) => {

        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const bands = useSelector(state => state.allBands.bands);
    const address = useSelector(state => state.allBands.addresses)
    console.log(address);

    // сортировка
    const handleSortOldest = () => {
        const sortedByDate = [...bands];
        sortedByDate.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        dispatch(sortBands(sortedByDate));
    }

    const handleSortNewest = () => {
        const sortOldFirst = [...bands];
        sortOldFirst.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch(sortBands(sortOldFirst));
    }

    const handleSortByUpdate = () => {
        const sortByUpdate = [...bands];
        sortByUpdate.sort((a, b) => new Date(b.updatedAt - new Date(a.updatedAt)));
        dispatch(sortBands(sortByUpdate))
    }

    const handleResetFilter = () => {

        dispatch(resetFilters());
    };

    // по локации

    const handleSortByLocation = async () => {
        await dispatch(setOriginalBands(bands));
        console.log(location);

        if (location) {
            const bandsFilteredByLocation = bands.filter(band => band.city === location.label);

            dispatch(sortBands(bandsFilteredByLocation));
        }
    };

    return (
        <Box sx={{ bgcolor: '#121212', width: '1150px' }}>
            <AppBar position="static" sx={{ backgroundColor: '#121212' }}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab icon={<SortIcon />} aria-label="sort"{...a11yProps(0)} />

                    <Tab icon={<LocationOnIcon />} aria-label="profile" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} sx={{}}>

                    <Box sx={{
                        gap: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  
                        justifyContent: 'center',
                    
                    }}>
                        <p style={{ color: 'white' }}>Сортировка: </p>
                        <FormControl fullWidth sx={{ width: '200px' }}
                        >
                            <InputLabel demo-simple-select-standard-label sx={{ color: 'white' }} id="demo-simple-select-label" >Дате обновления</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={location}
                                label="type"

                            >
                                <MenuItem onClick={handleSortByUpdate}> Дате обновления</MenuItem>
                                <MenuItem onClick={handleSortOldest}>Сначала старые</MenuItem>
                                <MenuItem onClick={handleSortNewest}>Сначала новые</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{
                        gap: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                       
                    }}>
                        <p style={{ color: 'white', margin: '0 10px 0 ' }}>По локации: </p>
                        <Autocomplete
                            id="combo-box-demo"
                            options={address}
                            onChange={(event, newValue) => setLocation(newValue)}
                            sx={{ width: 200, color: 'white' }}
                            renderInput={(params) => <TextField  {...params} label="Города" InputProps={{
                                ...params.InputProps,
                                style: { color: 'white' }, // Изменяем цвет текста в поле ввода
                            }} />}
                        />
                        <Button sx={{width: '200px'}} onClick={handleSortByLocation} >Поиск</Button>
                        <Button sx={{width: '200px'}} onClick={handleResetFilter}>Сбросить фильтрацию</Button>
                    </Box>
                </TabPanel>


            </SwipeableViews>
        </Box>
    );
}