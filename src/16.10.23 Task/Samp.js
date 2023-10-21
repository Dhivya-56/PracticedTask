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
  TablePagination,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Data from "./Data";
import { info } from "../TaskReducer";
function IPTable({ checkbox, step, nextFun }) {
  const selector = useSelector((state) => state.Task);

  const [ipData, setIpData] = useState(selector);
  const [ipDat, setIpDat] = useState(Data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

          if (!Object.keys(newExchange).length) {
            console.log("dkjds");
            delete item.exchange;
          } else {
            Object.keys(newExchange).forEach((key) => {
              if (newExchange[key] === 0) {
                delete newExchange[key];
              }
            });
            //   item.exchange = newExchange;
          }

          return {
            ...item,

            exchange: newExchange,
            meta: {
              web_log: {
                auth_error: {},
                trade_error: {},
              },
              oms_log: {
                auth_error: {},
                trade_error: {},
              },
              rms_log: {
                auth_error: {},
                trade_error: {},
              },
              db_log: {
                password: "",
                port: "",
                host: "",
                username: "",
                type: "",
                instance_type: "",
              },
              ex_adptr_log: {
                auth_error: {},
                trade_error: {},
              },
            },
          };
        }
        return item;
      });
    });
  };
  console.log(selector);
  useEffect(() => {
    dispatch(info(ipData));
  }, [ipData, dispatch]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{ position: "relative", bottom: 15 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e1f5fe" }}>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                Private Ip
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                NSE
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                BSE
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                MCX
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                NCDEX
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ipDat
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item, i) => (
                <TableRow
                  sx={
                    i % 2
                      ? { backgroundColor: "#e1f5fe" }
                      : { backgroundColor: " white" }
                  }
                  key={item.ip}
                >
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
      <TablePagination
        rowsPerPageOptions={[1, , 3, 2, 4, 5]}
        component="div"
        count={5}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="primary"
            disabled={step === 0}
            sx={{ fontWeight: 800, mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            variant="contained"
            onClick={nextFun}
            sx={{ mr: 1 }}
            disabled={!checkbox}
          >
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
}

export default IPTable;
