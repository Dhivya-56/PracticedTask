

import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  List,
  Divider,
  ListItemText,
  ListItem,
  ListItemButton,
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  Avatar,
  Menu,
  ListItemIcon,
  PaperProps,
  Tooltip
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const apiUrl = 'https://api.jikan.moe/v4/anime';
  const [animeData, setAnimeData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [drop, setDrop] = useState('all');
  const [dropData, setDropData] = useState([]);
  const [dropped, setDropped] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [selectedAnimeDetails, setSelectedAnimeDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const dropDownVal = [];
        const selectopVal = response.data.data.map((val) => {
          const arr = [];
          val.genres.map((item) => {
            arr.push(item.name);
            dropDownVal.push("all");
            dropDownVal.push(item.name);
          });
          return { ...val, arr };
        });
        const dropDownfilVal = [...new Set(dropDownVal)];
        setAnimeData(selectopVal);
        setDropData(dropDownfilVal);
        setSelected(selectopVal);
        setDropped(dropDownfilVal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddToSelected = (anime) => {
   
    setSelectedAnime((prevSelectedAnime) => [...prevSelectedAnime, anime]);
  
  };

  const handleRemoveFromSelected = (id) => {
    setSelectedAnime((prevSelectedAnime) =>
      prevSelectedAnime.filter((anime) => anime.mal_id !== id)
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;
  const open1 = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleMoreDetails = (anime) => {
    setSelectedAnimeDetails(anime);
    setMoreDetailsOpen(true);
  };
  const handleMoreDetails1=(anime)=>{
    setSelectedAnimeDetails(anime)
    setMoreDetailsOpen(true);
  }
function handleHome(){
  setSelected(animeData)
}
function handleProfile(){
 
  navigate('/profile')
}
  return (
    <Box component="div" display="flex"sx={{ p: 2 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        top="0%"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Button variant="contained" onClick={handleOpen}>
            CART
          </Button>
          <Tooltip title="Your profile" arrow>
            <Avatar sx={{ width: 32, height: 32 }} onClick={handleClick}>
              M
            </Avatar>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open1}
            onClose={handleClose1}
            onClick={handleClose1}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose1}>
              <Typography onClick={() => navigate('/profile')}>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose1}>
              <Typography onClick={() => navigate('/')}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider  bgcolor="blue"/>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleHome}>
              <ListItemText primary="Home"  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" onClick={handleProfile} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Cart" onClick={handleOpen} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Stack
        spacing={2}
        sx={{ p: 3 }}
        direction="row"
        display="flex"
        justifyContent="space-around"
        bgcolor="#35A29F"
        position="sticky"
        top="0%"
      >
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" sx={{ mx: 45 }}>Selected List</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedAnime.length ? (
          <Stack>
            {selectedAnime.map((select) => (
              <Card key={select.mal_id} sx={{ display: 'grid', maxWidth: 275, m: 1, mx: 36, p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={select.images?.jpg?.image_url}
                  alt={select.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {select.title}
                  </Typography>
                  <Button variant="outlined" onClick={() => handleRemoveFromSelected(select.mal_id)}>
                    Remove
                  </Button>
                  <Button variant="outlined" onClick={() => handleMoreDetails(select)}>
                    More Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center", color: 'gray' }}>No Data Displayed</Typography>
        )}
      </Dialog>
      {selected.length > 0 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Search Results:</Typography>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)"  >
            {selected.map((item) => (
              <Card key={item.mal_id} sx={{ maxWidth: 275, m: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={item.images?.jpg?.image_url}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Source: {item.source}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {item.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {item.rating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Score: {item.score}
                  </Typography>
                  {!selectedAnime.some((sele) => sele.mal_id === item.mal_id) ? (
                    <Button variant="outlined" onClick={() => handleAddToSelected(item)}>
                      ADD TO CART
                    </Button>
                  ) : (
                    <Button variant="outlined" disabled>
                      Added
                    </Button>
                  )}
                  
                    <Button variant="outlined" onClick={() => handleMoreDetails(item)}>
                      More details
                    </Button>
                 
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <Dialog
        open={moreDetailsOpen}
        onClose={() => setMoreDetailsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title">
          More Details - {selectedAnimeDetails?.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setMoreDetailsOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {selectedAnimeDetails && (
            <>
            <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={selectedAnimeDetails.images?.jpg?.image_url}
                  alt={selectedAnimeDetails.title}
                />
              <Typography variant="h6">{selectedAnimeDetails.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Source: {selectedAnimeDetails.source}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {selectedAnimeDetails.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rating: {selectedAnimeDetails.rating}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Score: {selectedAnimeDetails.score}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Synopsis: {selectedAnimeDetails.synopsis}
              </Typography>
              {/* Add more details here */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoreDetailsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <footer
        style={{
          width: "100%",
          background: "#00bfff",
          padding: "13px",
          position: "fixed",
          bottom: "0px",
          color: "black",
        }}
      >
        <Typography variant="body2" align="right">
          Terms of use | Security | Privacy | Infringement | copyright© 2023
          anime.com
        </Typography>
      </footer>


    </Box>
  );
};

export default Home;


