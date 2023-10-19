import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Dialog, DialogTitle, Button ,Stack, Badge} from "@mui/material";

import Home1 from "./Home1";
import Profile from "./Profile";
import Cart from "./Cart";
import Details from "./Details";
import { MenuItem, Menu, Tooltip }
    from "@mui/material";
import { useNavigate } from "react-router-dom";
import { info } from "../WebReducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const drawerWidth = 240;

const Dash = () => {
    const selector = useSelector(state => state.Anime.value)
    console.log(selector)
    const [selectedIndex, setSelectedIndex] = React.useState(0);
  
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const open1 = Boolean(anchorEl);
    const handleAvatarClick = () => {
        setProfileOpen(true);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileClose = () => {
        setProfileOpen(false);
    };
    const cartProducts = JSON.parse(localStorage.getItem("cartData"));
    console.log(cartProducts)
    const handleLogout = () => {
        navigate('/')

        dispatch(info({ ...selector, loggIn: false }))

    };
    const handleProfile = () => {
        window.location.href = "/profile";
    };
    const handleClose1 = () => {
        setAnchorEl(null);
    };
    function handleProfile1() {
        setSelectedIndex(1);


        handleClose1();

        navigate('profile');
    }
 
    
    return (
        <Box sx={{ display: 'flex' }}>
          
           
      <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: "flex", height: "fitContent" }}
                    >
                        <Box component="img" src="/logo.jpeg" sx={{height:50, width:70}}>
                        
                        </Box>
                            
                        <Box  sx={{ position: "relative", float: "right", marginLeft: 100 }}> <Tooltip title="Your profile" arrow>
                          <Stack spacing={2} direction="row">
                            <Typography sx={{fontFamily:'Jokerman',fontSize:25,fontWeight:1400}}>{selector.fname}</Typography>
                            <Avatar sx={{ width: 32, height: 32 ,position:"relative",top:5}} onClick={handleClick}>
                           <MoreVertIcon/>
                            </Avatar>
                            </Stack>

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
                                    <Typography onClick={handleProfile1}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose1}>
                                    <Typography onClick={handleLogout}>Logout</Typography>
                                </MenuItem>
                            </Menu>


                        </Box>
                       
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },

                }}
            >
                <Toolbar />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={() => setSelectedIndex(0)}
                            component={Link}
                            to="/home"
                        >
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={() => setSelectedIndex(1)}
                            component={Link}
                            to="/profile"
                        >
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={() => setSelectedIndex(2)}
                            component={Link}
                            to="/cart"
                        >
                            <Badge badgeContent={cartProducts.length} color="primary" sx={{position:"relative",left:2}}>
                            <ListItemText primary="Cart" />
                            </Badge>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="home" element={<Home1 />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="details/:id" element={<Details />} />
                </Routes>
            </Box>
            <Dialog
                open={profileOpen}
                onClose={handleProfileClose}
                sx={{
                    width: "2500px",
                    position: "absolute",
                    bottom: "60%",
                    right: "1%",
                }}
            >
                <DialogTitle onClick={handleProfile}>Profile</DialogTitle>
                <Button >Logout</Button>
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

export default Dash;