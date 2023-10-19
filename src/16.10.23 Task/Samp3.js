
import React, { useState } from 'react'
import { Table, Box,Button, TableBody, TableHead, TableRow, TableCell, Paper, Checkbox, TableContainer } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { info } from '../TaskReducer'

const Samp3 = ({checkbox, step,setStep,nextFun,backFun}) => {
    const selector = useSelector(state => state.Task)
    console.log(selector)
    const val2 = selector.filter(item => item.selected_metric)

    return (
        <Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Private Ip</TableCell>
                        <TableCell>Exchange</TableCell>
                        <TableCell>Instance Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selector.map(item => (
                        <TableRow key={item.ip}>
                            <TableCell>{item.ip}</TableCell>
                            <TableCell>
                                <div>
                                    {Object.keys(item.exchange).map(key => (
                                        <p key={key}>{key}</p>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    {Object.keys(item.selected_metrics).map(key => (
                                        <p key={key}>{key}</p>
                                    ))}
                                </div>
                            </TableCell>
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
           <Button onClick={nextFun} sx={{ mr: 1 }} >
             Next
           </Button>
         </Box>
       </React.Fragment>
       </Box>
    )
}

export default Samp3
