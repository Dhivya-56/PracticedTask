import {
  Table,
  TableBody,
  Box,
  Button,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { info } from "../TaskReducer";


const Samp2 = ({ step, filteredData, final, setStepping, setStep }) => {
  const selector = useSelector((state) => state.Task);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const [dat, setDat] = useState(selector);
  const [ipTable, setIpTable] = useState(filteredData);

  function handleNext() {
    setStep((prevActiveStep) => prevActiveStep + final[0]);
  }

  function handleBack() {
    setStep((prevActiveStep) => prevActiveStep - 1);
  }

  useEffect(() => {
    setIpTable(filteredData);
  }, [filteredData]);
  const checkbox = filteredData.every(
    (item) =>
      item.selected_metrics &&
      Object.values(item.selected_metrics).some((value) => value !== undefined)
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (ip, head) => {
    setDat((prevData) => {
      return prevData.map((item) => {
        if (item.ip === ip) {
          const newExchange = item.selected_metrics
            ? { ...item.selected_metrics }
            : {};

          newExchange[head] = !newExchange[head];

          Object.keys(newExchange).forEach((key) => {
            if (!newExchange[key]) {
              delete newExchange[key];
            }
          });

          if (head === "WEB") {
            if (newExchange[head]) {
              setStepping((prevStepping) => ({
                ...prevStepping,
                [head]: 1,
              }));
            } else {
              setStepping((prevStepping) => {
                const updatedStepping = { ...prevStepping };

                delete updatedStepping[head];
                return updatedStepping;
              });
            }
          } else if (head === "OMS") {
            if (newExchange[head]) {
              setStepping((prevStepping) => ({
                ...prevStepping,
                [head]: 2,
              }));
            } else {
              setStepping((prevStepping) => {
                const updatedStepping = { ...prevStepping };

                delete updatedStepping[head];
                return updatedStepping;
              });
            }
          } else if (head === "RMS") {
            if (newExchange[head]) {
              setStepping((prevStepping) => ({
                ...prevStepping,
                [head]: 3,
              }));
            } else {
              setStepping((prevStepping) => {
                const updatedStepping = { ...prevStepping };

                delete updatedStepping[head];
                return updatedStepping;
              });
            }
          } else if (head === "EXC") {
            if (newExchange[head]) {
              setStepping((prevStepping) => ({
                ...prevStepping,
                [head]: 4,
              }));
            } else {
              setStepping((prevStepping) => {
                const updatedStepping = { ...prevStepping };

                delete updatedStepping[head];
                return updatedStepping;
              });
            }
          } else if (head === "DB") {
            if (newExchange[head]) {
              setStepping((prevStepping) => ({
                ...prevStepping,
                [head]: 5,
              }));
            } else {
              setStepping((prevStepping) => {
                const updatedStepping = { ...prevStepping };

                delete updatedStepping[head];
                return updatedStepping;
              });
            }
          }

          return { ...item, selected_metrics: newExchange };
        }
        return item;
      });
    });
  };
  useEffect(() => {
    dispatch(info(dat));
  }, [dat]);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e1f5fe", height: 10 }}>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                Private IP
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                WEB
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                OMS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                RMS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                Database
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                Exchange
                <br />
                Connectivity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ipTable
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
                  {["WEB", "OMS", "RMS", "DB", "EXC"].map((head) => (
                    <TableCell key={head} sx={{ p: 1 }}>
                      <Checkbox
                        checked={
                          item.selected_metrics && item.selected_metrics[head]
                        }
                        onChange={() => handleCheckboxChange(item.ip, head)}
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
        <Box sx={{ float: "right", pt: 2 }}>
          <Button
            color="primary"
            disabled={step === 0}
            onClick={handleBack}
            sx={{ fontWeight: 700, mr: 1 }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mr: 1 }}
            disabled={!checkbox}
          >
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp2;
