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
  const isAnyDataSelected = ipWeb.length > 0;
  function checkData(data) {
    switch (data) {
      case "WEB":
        return "web_log";
      case "OMS":
        return "oms_log";
      case "RMS":
        return "rms_log";
      case "EXC":
        return "ex_adptr_log";
      default:
        return null;
    }
  }
  const checkData1 = checkData(data);

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
  useEffect(() => {
    dispatch(info(final));
  }, [final, dispatch]);

  return (
    <Box>
      {isAnyDataSelected ? (
        ipWeb.map((web) => (
          <Box key={web.ip}>
            <Typography sx={{ position: "relative", left: 5 }}>
              {web.ip}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                left: 70,
              }}
            >
              <Typography sx={{ position: "relative", top: 20, right: 60 }}>
                Auth Error
              </Typography>
              <TextField
                label="Database Name"
                sx={{ m: 2, width: 250 }}
                name="dbname"
                size="small"
                placeholder="DB_Name"
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
                sx={{ m: 2, width: 330, position: "relative", right: 10 }}
                name="query"
                size="small"
                placeholder="select * from table_name Limit 0.10"
                value={web.meta?.query}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  handleInputChange(
                    web.ip,
                    "auth_error",
                    "query",
                    e.target.value
                  )
                }
                defaultValue={web.meta?.[checkData1].auth_error.query}
              ></TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                left: 70,
              }}
            >
              <Typography sx={{ position: "relative", top: 20, right: 60 }}>
                Trade Error
              </Typography>
              <TextField
                label="Database Name"
                sx={{ m: 2, width: 250 }}
                size="small"
                placeholder="DB_Name"
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
                sx={{ m: 2, width: 330, position: "relative", right: 10 }}
                size="small"
                placeholder="select * from table_name Limit 0.10"
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
        ))
      ) : (
        <Typography
          sx={{ textAlign: "center", fontSize: 24, color: "#90a4ae" }}
        >
          No configuration selected for your {[data]} server
        </Typography>
      )}
      <React.Fragment>
        <Box sx={{ float: "right", pt: 2 }}>
          <Button
            color="primary"
            disabled={step === 0}
            onClick={backFun}
            sx={{ mr: 1, fontWeight: 700 }}
          >
            Back
          </Button>

          <Button variant="contained" onClick={nextFun} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp4;
