import React from 'react'
import { info } from '../WebReducers'
import { useSelector } from 'react-redux'
import { Box,Typography } from '@mui/material'

const Profile = () => {
    const selector=useSelector(state=>state.Anime.value)
    console.log(selector)
    
  return (
  <Box>
    <h1>Profile</h1>
    <Typography sx={{margin:1,fontSize:20}}>Name       :     {selector.fname}</Typography>
    <Typography sx={{margin:1,fontSize:20}}> Email Id       :     {selector.email}</Typography>
    <Typography sx={{margin:1,fontSize:20}}> Password    :    {selector.pass}</Typography>
    <Typography sx={{margin:1,fontSize:20}}>Phone No    :    {selector.phno}</Typography>
   <img src="itsme.jpg" width="200" height="200" style={{position:'relative',left:370,bottom:190}}/>
    

  </Box>
  )
}

export default Profile;
