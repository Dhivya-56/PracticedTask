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

const Samp2 = ({ step, nextFun, backFun }) => {
  const selector = useSelector((state) => state.Task);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  const filteredData = selector.filter((item) => item.exchange);
  // const filteredData = selector.filter((item) => Object.keys(item.exchange)?.length > 0);
  // const [ipsecond, setIpSecond] = useState(selector);
  const [ipTable, setIpTable] = useState(filteredData);
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
    setIpTable((prevData) => {
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

          return { ...item, selected_metrics: newExchange };
        }
        return item;
      });
    });
  };
  useEffect(() => {
    dispatch(info(ipTable));
  }, [ipTable, dispatch]);

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
                WEB
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                OMS
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                RMS
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                DB
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#2196f3" }}>
                EXC
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
                    <TableCell key={head}>
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
};

export default Samp2;
