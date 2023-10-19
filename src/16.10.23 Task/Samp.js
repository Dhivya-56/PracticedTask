import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import { Key } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Data from "./Data";
import { info } from "../TaskReducer";
function IPTable({checkbox, step,setStep,nextFun}) {
  const selector = useSelector((state) => state.Task);

  const [ipData, setIpData] = useState(selector);
  const [ipDat, setIpDat] = useState(Data);
  const dispatch = useDispatch();

  const handleCheckboxChange = (ip, heading) => {
    setIpData((prevData) => {
      return prevData.map((item) => {
        if (item.ip === ip) {
          const newExchange = item.exchange ? { ...item.exchange } : {};

          if (heading === "NSE") {
            newExchange[heading] = newExchange[heading] === 1 ? 0 : 1;
          } else if (heading === "BSE") {
            newExchange[heading] = newExchange[heading] === 2 ? 0 : 2;
          } else if (heading === "MCX") {
            newExchange[heading] = newExchange[heading] === 3 ? 0 : 3;
          } else if (heading === "NCDEX") {
            newExchange[heading] = newExchange[heading] === 4 ? 0 : 4;
          }

          Object.keys(newExchange).forEach((key) => {
            if (newExchange[key] === 0) {
              delete newExchange[key];
            }
          });

          return { ...item, exchange: newExchange };
        }
        return item;
      });
    });

    dispatch(info(ipData));
  };

  console.log(ipData);
  console.log(ipDat);

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Private Ip</TableCell>
            <TableCell>NSE</TableCell>
            <TableCell>BSE</TableCell>
            <TableCell>MCX</TableCell>
            <TableCell>NCDEX</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ipDat.map((item) => (
            <TableRow key={item.ip}>
              <TableCell>{item.ip}</TableCell>
              {["NSE", "BSE", "MCX", "NCDEX"].map((heading) => (
                <TableCell key={heading}>
                  <Checkbox
                    defaultChecked={selector.some(
                      (val) => val.ip === item.ip && val.exchange?.[heading]
                    )}
                    onChange={() => handleCheckboxChange(item.ip, heading)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <React.Fragment>
     <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
       <Button
         color="inherit"
         disabled={step === 0}
        //  onClick={handleBack}
         sx={{ mr: 1 }}
       >
         Back
       </Button>
       <Box sx={{ flex: "1 1 auto" }} />
       <Button onClick={nextFun} sx={{ mr: 1 }} disabled={!checkbox}>
         Next
       </Button>
     </Box>
   </React.Fragment>
   </Box>
  );
}

export default IPTable;
