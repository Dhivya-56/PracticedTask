import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { info } from '../WebReducers';
import {
  Box,
  Link,
  Grid,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Container,
} from '@mui/material';


const Login = () => {
  const selector = useSelector((state) => state.Anime.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(selector);

  const emailValid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,10})$/;
  const passWordvalid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%]).{8,20}$/;
  console.log(login.email === selector.email && login.pass === selector.pass)
 
  function handleClick(e) {
    e.preventDefault();
    if (emailValid.test(login.email) && passWordvalid.test(login.pass) && login.email.trim() !== '' && login.pass.trim() !== '' && login.email === selector.email && login.pass === selector.pass) {
      

        alert('Welcome Back Again!');
        navigate('/home')
        dispatch(info({ ...login, loggIn: true }));
        
      }
    else {
      alert('Please enter valid information');
    }
 
  




  }
  dispatch(info(login))
  console.log(selector)




  return (
    <Box sx={{}}>
      <Container component="main" sx={{ marginTop: '100px', width: 700, borderRadius: 4, boxShadow: 20, display: 'flex', bgcolor: '#ff8080' }}>
        <CssBaseline />
        <img src="lock.jpg" height="300" width="300" style={{ marginRight: 30, marginTop: 30 }} />
        <div>
          <img src="animesignin.jpeg" alt="Anime Sign In" width="90px" height="90px" style={{ marginTop: 5 }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // inputRef={refEmail}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // inputRef={refPass}
              onChange={(e) => setLogin({ ...login, pass: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item >
                <Button variant="body2" onClick={() => navigate("/signup")} sx={{ color: 'red', marginBottom: 2, fontFamily: 'initial', fontWeight: 900 }} >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </Box>
  );
};

export default Login;



