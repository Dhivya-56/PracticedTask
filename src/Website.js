import React from 'react'
import Login from './Anime Website/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './Anime Website/SignUp'
import Profile from './Anime Website/Profile'
import Notfound from './Anime Website/Notfound'
import Home1 from './Anime Website/Home1'
import Dash from './Anime Website/Dash'
import Home2 from './Anime Website/Home2'
import Cart from './Anime Website/Cart'
import { Box, Typography } from '@mui/material'
import Details from './Anime Website/Details'
import ProtectedRoutes from './Anime Website/ProtectedRoutes'
const Website = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{textAlign:'center',margin:3,fontSize:22,fontWeight:900}}>Shop Anime Doll Online</Typography>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
     
      <Route path="/" element={<ProtectedRoutes/>}>
  
          <Route path="home" element={<Home1 />}/>
          
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
         
          <Route path="details/:id" element={<Details />}/>

          </Route>
          
          <Route path="*" element={<Notfound/>}/>
     </Routes>
     </BrowserRouter>
    
    </Box>
  )
}

export default Website
