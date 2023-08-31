import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import SortIcon from "@mui/icons-material/Sort";
import Person2Icon from "@mui/icons-material/Person2";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  filterByCandidate,
  filterByGroup,
  sortByDateAp,
  sortByDateDown,
} from "../../redux/ads.slice";
import { getAdds } from "../../redux/Thunk/getAdds";

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
        <Box sx={{ s: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const userAds = useSelector((state) => state.adsSlice.statusSort);
  console.log(userAds);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (
    <Box sx={{ bgcolor: "#121212", width: "1150px" }}>
      <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {" "}
          <Tab icon={<SortIcon />} aria-label="sort" {...a11yProps(0)} />
          <Tab
            icon={<Diversity3OutlinedIcon />}
            label="Группы"
            aria-label="profile"
            {...a11yProps(1)}
            onClick={() => dispatch(filterByGroup())}
          />
          <Tab
            icon={<Person2Icon />}
            aria-label="profile"
            label="Кандидаты"
            {...a11yProps(2)}
            onClick={() => dispatch(filterByCandidate())}
          />
          <Tab
            icon={<BorderAllOutlinedIcon />}
            label="Все"
            aria-label="profile"
            {...a11yProps(3)}
            onClick={() => dispatch(getAdds())}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box
            sx={{
              maxWidth: "1200px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <span style={{ color: "white", margin: "0 10px 0 " }}>
              Сортировка:{" "}
            </span>
            <FormControl fullWidth sx={{ margin: "0 200px 0 200px" }}>
              <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
                По дате
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="type"
                onChange={handleChange}
              >
                <MenuItem onClick={() => dispatch(sortByDateDown({ val: 0 }))}>
                  Новые
                </MenuItem>
                <MenuItem onClick={() => dispatch(sortByDateAp({ val: 1 }))}>
                  Старые
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
