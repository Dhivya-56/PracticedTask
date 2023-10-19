
import { Table, TableBody,Box,Button, TableHead, TableRow, TableCell, Paper, Checkbox, TableContainer } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { info } from '../TaskReducer'

const Samp2 = ({ step,setStep,nextFun,backFun}) => {
  const selector = useSelector(state => state.Task);
  const dispatch = useDispatch();

  
  const filteredData = selector.filter(item => item.exchange);
  const [ipTable, setIpTable] = useState(filteredData);
  const checkbox = selector.some(
    (item) =>
      item.selected_metrics &&
      Object.values(item.selected_metrics).some((value) => value !== undefined)
  );
  useEffect(() => {
    
    dispatch(info(ipTable));
  }, [ipTable, dispatch]);

  const handleCheckboxChange = (ip, head) => {
    setIpTable(prevData => {
      return prevData.map(item => {
        if (item.ip === ip) {
          const newExchange = item.selected_metrics ? { ...item.selected_metrics } : {};

         
          newExchange[head] = !newExchange[head];

         
          Object.keys(newExchange).forEach(key => {
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

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Private Ip</TableCell>
            <TableCell>WEB</TableCell>
            <TableCell>OMS</TableCell>
            <TableCell>RMS</TableCell>
            <TableCell>DB</TableCell>
            <TableCell>EXC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map(item => (
            <TableRow key={item.ip}>
              <TableCell>{item.ip}</TableCell>
              {["WEB", "OMS", "RMS", "DB", "EXC"].map(head => (
                <TableCell key={head}>
                  <Checkbox
                    checked={item.selected_metrics && item.selected_metrics[head]}
                    onChange={() => handleCheckboxChange(item.ip, head)}
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
        onClick={backFun}
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

export default Samp2;
