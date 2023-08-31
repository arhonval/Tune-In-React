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
import { Autocomplete, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setOriginalProfiles, sortProfiles } from '../../redux/allProfiles.slice';
import { getAllUserInstruments, getAlluserGenres } from '../../redux/Thunk/getAllProfiles';





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

    const handleChange = (event, newValue) => {

        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const profiles = useSelector(state => state.allProfiles.profiles)
    console.log(profiles);


    // фильтрация по типу

    const names = useSelector(state => state.newUserProfile.userTypes)
    console.log(names);


    const [clickedType, setClickedType] = useState([]);

    const handleChipType = (type) => {
        if (clickedType.includes(type)) {
            setClickedType(prevChips => prevChips.filter(chip => chip !== type));
        } else {
            setClickedType(prevChips => [...prevChips, type]);
        }
    };

    //фильтрация по жанру
    const genres = useSelector(state => state.tags.genres)


    const [clickedGenres, setClickedGenres] = useState([]);

    const handleChipClick = (genre) => {
        if (clickedGenres.includes(genre)) {
            setClickedGenres(prevChips => prevChips.filter(chip => chip !== genre));
        } else {
            setClickedGenres(prevChips => [...prevChips, genre]);
        }
    };

    //фильтрация по инструменту
    const instruments = useSelector(state => state.tags.instruments)

    const [clickedInstruments, setClickedInstruments] = useState([]);

    const handleInstrumentClick = (instrument) => {
        if (clickedInstruments.includes(instrument)) {
            setClickedInstruments(prevChips => prevChips.filter(chip => chip !== instrument));
        } else {
            setClickedInstruments(prevChips => [...prevChips, instrument]);
        }
    };


    // сортировка
    const handleSortOldest = () => {
        const sortedByDate = [...profiles];
        sortedByDate.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        dispatch(sortProfiles(sortedByDate));
    }

    const handleSortNewest = () => {
        const sortOldFirst = [...profiles];
        sortOldFirst.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch(sortProfiles(sortOldFirst));
    }

    const handleSortByUpdate = () => {
        const sortByUpdate = [...profiles];
        sortByUpdate.sort((a, b) => new Date(b.updatedAt - new Date(a.updatedAt)));
        dispatch(sortProfiles(sortByUpdate))
    }

    const handleSortByType = async () => {
        await dispatch(setOriginalProfiles(profiles));
        const profilesByType = [...profiles];

        const filteredProfiles = profilesByType.filter((el) => el.UserType?.name.includes(clickedType));

        dispatch(sortProfiles(filteredProfiles));
    };

    const handleSortByGenre = async () => {
        await dispatch(setOriginalProfiles(profiles));
        dispatch(getAlluserGenres(clickedGenres));
    }

    const handleSortByInstrument = async () => {
        await dispatch(setOriginalProfiles(profiles));
        dispatch(getAllUserInstruments(clickedInstruments));
    }

    const handleResetFilter = () => {

        dispatch(resetFilters());
    };

    //по локации
    const address = useSelector(state => state.allBands.addresses)
    console.log(address);
    const [location, setLocation] = useState('');

    const handleSortByLocation = async () => {
        await dispatch(setOriginalProfiles(profiles));


        if (location) {
            const profilesFilteredByLocation = profiles.filter(el => el.city === location.label);

            dispatch(sortProfiles(profilesFilteredByLocation));
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
                    <Tab icon={<Person2Icon />} aria-label="profile" {...a11yProps(1)} />

                    <Tab icon={<LocationOnIcon />} aria-label="profile" {...a11yProps(2)} />
                    <Tab icon={<MusicNoteIcon />} aria-label="profile" {...a11yProps(3)} />
                    <Tab icon={<StraightenIcon />} aria-label="profile" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction}>

                    <Box sx={{ gap: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  
                        justifyContent: 'center', }}>
                        <p style={{ color: 'white', margin: '0 10px 0 ' }}>Сортировка: </p>
                        <FormControl fullWidth sx={{ width: '200px'  }}>
                            <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label" >Дате обновления</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //   value={age}
                                label="type"
                                onChange={handleChange}
                            >
                                <MenuItem onClick={handleSortByUpdate}> Дате обновления</MenuItem>
                                <MenuItem onClick={handleSortOldest}>Сначала старые</MenuItem>
                                <MenuItem onClick={handleSortNewest}>Сначала новые</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className='tags' style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                        {names?.map((el) => (
                            <Chip
                                variant={clickedType.includes(el) ? 'filled' : 'outlined'}
                                color='secondary'
                                key={el.id}
                                label={el}
                                clickable onClick={() => handleChipType(el)}
                                sx={{ width: '150px' }}
                            />
                        ))}
                    </div>
                    <Button color="secondary" onClick={handleSortByType}>Искать</Button>
                    <Button color="secondary" onClick={handleResetFilter}>Сбросить фильтрацию</Button>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Box sx={{ gap: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', }}>
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
                        <Button color="secondary" onClick={handleSortByLocation} >Поиск</Button>
                        <Button color="secondary" onClick={handleResetFilter}>Сбросить фильтрацию</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <div className='tags' style={{ display: 'flex', justifyContent: 'center' }}>
                        {genres?.map((el) => (
                            <Chip
                                variant={clickedGenres.includes(el.genre) ? 'filled' : 'outlined'}
                                color='secondary'
                                key={el.id}
                                label={el.genre}
                                sx={{ width: '150px' }}
                                clickable onClick={() => handleChipClick(el.genre)}
                            />
                        ))}
                    </div>
                    <Button color="secondary" onClick={handleSortByGenre}>Искать</Button>
                    <Button color="secondary" onClick={handleResetFilter}>Сбросить фильтрацию</Button>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <div className='tags' style={{ display: 'flex', justifyContent: 'center' }}>
                        {instruments?.map((el) => (
                            <Chip
                                variant={clickedInstruments.includes(el.instrument) ? 'filled' : 'outlined'}
                                color="secondary"
                                key={el.id}
                                label={el.instrument}
                                sx={{ width: '150px' }}
                                onClick={() => handleInstrumentClick(el.instrument)}
                                clickable />
                        ))}
                    </div>
                    <Button color="secondary" onClick={handleSortByInstrument}>Искать</Button>
                    <Button color="secondary" onClick={handleResetFilter}>Сбросить фильтрацию</Button>
                </TabPanel>

            </SwipeableViews>
        </Box>
    );
}
