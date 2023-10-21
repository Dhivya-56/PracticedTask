import React, { useState } from "react";
import {
  Table,
  Box,
  Button,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { info } from "../TaskReducer";
import { useEffect } from "react";

const Samp3 = ({ step, nextFun, backFun }) => {
  const selector = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const [lastSelector, setLastSelector] = useState(selector);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const select = selector.filter((item) => item.selected_metrics);
  const [last, setLast] = useState(select);
  useEffect(() => {
    dispatch(info(lastSelector));
  }, [lastSelector, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleSubmit() {
    setLastSelector((prev) => {
      return prev.map((item) => {
        if (item.selected_metrics === "WEB") {
          return item.selected
            ? {
                ...item,
                meta: {
                  web_log: {
                    auth_error: {},
                    trade_error: {},
                  },
                  oms_log: {},
                  rms_log: {},
                  ex_adptr_log: {},
                  db_log: {},
                },
              }
            : { ...item };
        } else if (item.selected_metrics === "OMS") {
          return item.selected
            ? {
                ...item,
                meta: {
                  oms_log: {
                    auth_error: {},
                    trade_error: {},
                  },
                  web_log: {},
                  rms_log: {},
                  ex_adptr_log: {},
                  db_log: {},
                },
              }
            : { ...item };
        } else if (item.selected_metrics === "RMS") {
          return item.selected
            ? {
                ...item,
                meta: {
                  rms_log: {
                    auth_error: {},
                    trade_error: {},
                  },
                  web_log: {},
                  oms_log: {},
                  ex_adptr_log: {},
                  db_log: {},
                },
              }
            : { ...item };
        } else if (item.selected_metrics === "EXC") {
          return item.selected
            ? {
                ...item,
                meta: {
                  ex_adptr_log: {
                    auth_error: {},
                    trade_error: {},
                  },
                  web_log: {},
                  oms_log: {},
                  rms_log: {},
                  db_log: {},
                },
              }
            : { ...item };
        } else if (item.selected_metrics === "DB") {
          return item.selected
            ? {
                ...item,
                meta: {
                  db_log: {
                    password: "",
                    port: "",
                    host: "",
                    username: "",
                    type: "",
                    instance_type: "",
                  },
                  web_log: {},
                  oms_log: {},
                  rms_log: {},
                  ex_adptr_log: {},
                },
              }
            : { ...item };
        } else {
          return item;
        }
      });
    });
  }
  console.log(selector);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e1f5fe" }}>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                Private Ip
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                Exchange
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                Instance Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {last
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item, i) => (
                <TableRow
                  sx={
                    i % 2
                      ? { backgroundColor: "#e1f5fe" }
                      : { backgroundColor: "white" }
                  }
                  key={item.ip}
                >
                  <TableCell>{item.ip}</TableCell>
                  <TableCell>
                    <div>
                      {Object.keys(item.exchange).map((key) => (
                        <p key={key}>{key}</p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {Object.keys(item.selected_metrics).map((key) => (
                        <p key={key}>{key}</p>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 3, 2, 4, 5]}
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
            onClick={backFun}
            sx={{ fontWeight: 800, mr: 1 }}
          >
            Back
          </Button>

          <Box sx={{ flex: "1 1 auto" }} />
          {step === 7 && (
            <Button variant="contained" onClick={handleSubmit} sx={{ mr: 1 }}>
              Submit
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp3;
