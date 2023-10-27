import React, { useState } from "react";
import {
  Table,
  Box,
  Button,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
 
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { info } from "../TaskReducer";
import { useEffect } from "react";

const Samp3 = ({
  step,
 
  filteredData,
  final,
 
  setStep,
 
}) => {
  const selector = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const [lastSelector, setLastSelector] = useState(selector);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [last, setLast] = useState(filteredData);
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
  function handleBack() {
    const newval = final.length - 1;
    setStep((prev) => prev - (prev - final[newval] - 1));
  }

  function handleSubmit() {
    if (final[final.length - 1] === 5) {
      setStep(7);
    }
    const newData = last.map((item) => {
      const { selected_metrics, meta } = item;
      return {
        ...item,
        meta: {
          web_log: selected_metrics.WEB ? meta?.web_log : {},
          oms_log: selected_metrics.OMS ? meta.oms_log : {},
          rms_log: selected_metrics.RMS ? meta.rms_log : {},
          db_log: selected_metrics.DB ? meta.db_log : {},
          ex_adptr_log: selected_metrics.EXC ? meta.ex_adptr_log : {},
        },
      };
    });

    setLastSelector(newData);
  }
 
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e1f5fe" }}>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                Private Ip
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
                Exchange
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#2196f3" }}>
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
                  <TableCell sx={{ p: 1 }}>
                    {Object.keys(item.exchange).map((key) => (
                      <p key={key}>{key}</p>
                    ))}
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    {Object.keys(item.selected_metrics).map((key) => (
                      <p key={key}>{key}</p>
                    ))}
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
        <Box sx={{ float: "right", pt: 2 }}>
          <Button
            color="primary"
            disabled={step === 0}
            onClick={handleBack}
            sx={{ fontWeight: 700, mr: 1 }}
          >
            Back
          </Button>

          {step === 7 && (
            <Button variant="contained" onClick={handleSubmit} sx={{ mr: 1 }}>
              Save
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp3;
