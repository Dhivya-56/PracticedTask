import React, { useState } from "react";
import { useSelector } from "react-redux";
import { info } from "../TaskReducer";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
const Samp5 = ({ step, nextFun, backFun, setStep }) => {
  const selector = useSelector((state) => state.Task);
  const [db, setDb] = useState(selector);
  const dispatch = useDispatch();
  const Dbfilter = db?.filter((values) => values?.selected_metrics?.DB);

  const [dbpage, setDbpage] = useState(Dbfilter);

  const isDBselected = dbpage.length > 0;
  function handleChange(ip, field, value) {
    setDb((data) => {
      return data.map((item) => {
        if (item.ip === ip) {
          return {
            ...item,
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
                ...item?.meta?.db_log,
                [field]: value,
              },
            },
          };
        }
        return item;
      });
    });
  }
  useEffect(() => {
    dispatch(info(db));
  }, [db, dispatch]);
  console.log(selector);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          textAlign: "center",
          position: "relative",
          bottom: 23,
          right: 73,
          fontFamily: "Bahnschrift",
        }}
      >
        Configure your Database server for LAMA
      </Typography>
      {isDBselected ? (
        dbpage.map((web) => (
          <Box>
            <Box>
              <Typography>{web.ip}</Typography>
            </Box>
            <Box key={web.ip} sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  top: 20,
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Application Type"
                  name="instance_type"
                  size="small"
                  notched="true"
                  sx={{ width: 350, position: "relative", left: 15 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={web.meta.db_log.instance_type}
                  onChange={(e) =>
                    handleChange(web.ip, "instance_type", e.target.value)
                  }
                >
                  <MenuItem value={"Web"}>Web</MenuItem>
                  <MenuItem value={"Rms"}>Rms</MenuItem>
                  <MenuItem value={"Oms"}>Oms</MenuItem>
                  <MenuItem value={"Exchange"}>Exchange</MenuItem>
                </Select>
                <TextField
                  label="Port"
                  name="username"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ m: 2, width: 350, position: "relative", top: 9 }}
                  defaultValue={web.meta.db_log.username}
                  onChange={(e) =>
                    handleChange(web.ip, "username", e.target.value)
                  }
                ></TextField>
                <TextField
                  label="Password"
                  sx={{ m: 2, width: 350 }}
                  size="small"
                  type="password"
                  name="port"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={web.meta.db_log.port}
                  onChange={(e) => handleChange(web.ip, "port", e.target.value)}
                ></TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  position: "relative",
                  right: 10,
                }}
              >
                <TextField
                  label="Host"
                  size="small"
                  sx={{
                    m: 2,
                    width: 350,
                    position: "relative",
                    right: 20,
                    top: 3,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="host"
                  defaultValue={web.meta.db_log.host}
                  onChange={(e) => handleChange(web.ip, "host", e.target.value)}
                ></TextField>
                <TextField
                  label="Username"
                  size="small"
                  sx={{
                    m: 2,
                    width: 350,
                    position: "relative",
                    right: 20,
                    bottom: 3,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="password"
                  defaultValue={web.meta.db_log.password}
                  onChange={(e) =>
                    handleChange(web.ip, "password", e.target.value)
                  }
                ></TextField>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="DB Type"
                  name="type"
                  size="small"
                  notched="true"
                  sx={{ width: 350, position: "relative", left: -3, top: 3 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={web.meta.db_log.type}
                  onChange={(e) => handleChange(web.ip, "type", e.target.value)}
                >
                  <MenuItem value={"MySql"}>MySql</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Typography
          sx={{ textAlign: "center", fontSize: 24, color: "#90a4ae" }}
        >
          No Configuration Selected On DB Server
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

export default Samp5;
