import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
 
  Button,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { info } from "../TaskReducer";
import { useDispatch, useSelector } from "react-redux";
import Data from "./Data";
const Tab = () => {
  
  const [mydata, setMydata] = useState(Data);
 const  data1=[1,2,3,4]
 function handleCheckBoxChange(id){
  const final={...mydata}
  console.log(final)
  };

  
 
 

  return (
    <Box
      sx={{
        border: "1px solid black",
        width: 650,
        margin: "auto",
        marginTop: 3,
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: 25 }}>
        DATA IN THE TABLE
      </Typography>
      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#867de3" }}
              hover={true}
              selected={true}
            >
              <TableCell sx={{ fontSize: 15, fontWeight: 700 }}>
                Private Ip
              </TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 700 }}>NSE</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 700 }}>BSE</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 700 }}>MCX</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 700 }}>
                NCDEX
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((values, i) => (
              <TableRow
                key={values.id}
                sx={
                  i % 2
                    ? { backgroundColor: "#b4edeb" }
                    : { backgroundColor: "#f8bbcf" }
                }
              >
                <TableCell>{values.ip}</TableCell>
                {data1.map((item)=>(
                  <TableCell key={item}>
                    <Checkbox value={item} onChange={()=>handleCheckBoxChange(item)}/>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
  );
};

export default Tab;
