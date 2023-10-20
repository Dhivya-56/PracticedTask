import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { info } from "../TaskReducer";
const Samp4 = ({ step, nextFun, backFun, data }) => {
 
  const selector = useSelector((state) => state.Task);

  const [final, setFinal] = useState(selector);
  const dispatch = useDispatch();
  const Web = final.filter((values) => values.selected_metrics?.[data]);

  const [ipWeb, setIpWeb] = useState(Web);
  useEffect(() => {
    dispatch(info(final));
  }, [final, dispatch]);

  function checkData(data){
    switch(data){
      case 'WEB':
        return "web_log"
        case "OMS":
          return "oms_log"
          case "RMS":
            return "rms_log"
            case "EXC":
              return "ex_adptr_log"
            default:
              return null
    }
   }
   const checkData1 = checkData(data)
   

  function handleInputChange(ip, auth, field, value) {

    setFinal((prevDat) => {
      return prevDat.map((item) => {
        if (item.ip === ip) {
          return {
            ...item,
            meta: {
              ...item?.meta,
              [checkData1]: {
                ...item?.meta?.[checkData1],
                [auth]: {
                  ...item?.meta?.[checkData1]?.[auth],
                  [field]: value,
                },
              },
            },
          };
        }
        return item;
      });
    });
  }

  return (
    <Box>
      {ipWeb.map((web) => (
        <Box key={web.ip}>
          <Typography>{web.ip}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ position: "relative", top: 30 }}>
              Auth Error
            </Typography>
            <TextField
              label="Database Name"
              sx={{ m: 2 }}
              name="dbname"
              value={web.meta?.dbname}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputChange(
                  web.ip,
                  "auth_error",
                  "dbname",
                  e.target.value
                )
              }
              defaultValue={web.meta?.[checkData1].auth_error.dbname}
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              name="query"
              value={web.meta?.query}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputChange(web.ip, "auth_error", "query", e.target.value)
              }
              defaultValue={web.meta?.[checkData1].auth_error.query}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ position: "relative", top: 30 }}>
              Trade Error
            </Typography>
            <TextField
              label="Database Name"
              sx={{ m: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputChange(
                  web.ip,
                  "trade_error",
                  "dbname",
                  e.target.value
                )
              }
              defaultValue={web.meta?.[checkData1].trade_error.dbname}
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputChange(
                  web.ip,
                  "trade_error",
                  "query",
                  e.target.value
                )
              }
              defaultValue={web.meta?.[checkData1].trade_error.query}
            ></TextField>
          </Box>
        </Box>
      ))}
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
          <Button onClick={nextFun} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp4;
