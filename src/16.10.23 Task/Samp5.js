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

  return (
    <Box>
      {dbpage.map((web) => (
        <Box key={web.ip} sx={{ display: "flex" }}>
          <Typography>{web.ip}</Typography>
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
              label="instance-type"
              name="instance_type"
              sx={{ width: 225, position: "relative", left: 15 }}
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
              label="Database Name"
              name="username"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ m: 2 }}
              defaultValue={web.meta.db_log.username}
              onChange={(e) => handleChange(web.ip, "username", e.target.value)}
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
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
              justifyContent: "center",
            }}
          >
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              name="host"
              value={web.ip}
              defaultValue={web.meta.db_log.host}
              onChange={(e) => handleChange(web.ip, "host", e.target.value)}
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              name="password"
              defaultValue={web.meta.db_log.password}
              onChange={(e) => handleChange(web.ip, "password", e.target.value)}
            ></TextField>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              name="type"
              sx={{ width: 225, position: "relative", left: 15 }}
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
      ))}
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="primary"
            disabled={step === 0}
            onClick={backFun}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button variant="contained" onClick={nextFun} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp5;
