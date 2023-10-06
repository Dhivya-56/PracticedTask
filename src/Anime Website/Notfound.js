import { Typography ,Box} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
import Error from '../error.png'
const Notfound = () => {
    const navigate=useNavigate()
  return (
   <Box sx={{margin:'auto',float:'center'}}>
    <Typography sx={{textalign:'center',fontWeight:600,fontSize:20,color:'red'}}>NOT FOUND</Typography>
    <Box
  component="img"
  sx={{
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
  }}
  alt="The house from the offer."
  src={Error}
/>
   
    <Button  variant="contained"onClick={()=>navigate('/home') } sx={{fontSize:20,position:'relative',left:30,bottom:200}}>Back</Button>
   </Box>
  )
}

export default Notfound
