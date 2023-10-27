import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector, useDispatch } from "react-redux";
import { info } from "../TaskReducer";

const Samp4 = ({ step, data, final, setStep }) => {
  const selector = useSelector((state) => state.Task);
  const [final1, setFinal] = useState(selector);
  const dispatch = useDispatch();
  const Web = final1.filter((values) => values.selected_metrics?.[data]);
  const [stepFinalData, setStepfinaldata] = useState(null);
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

  useEffect(() => {
    switch (data) {
      case "WEB":
        setStepfinaldata(1);
        break;
      case "OMS":
        setStepfinaldata(2);
        break;
      case "RMS":
        setStepfinaldata(3);
        break;
      case "EXC":
        setStepfinaldata(4);
        break;
    }
  }, [data]);
  
  function handleNext() {
    const val = final.indexOf(stepFinalData);
    if (val === final.length - 1) {
      setStep(7);
    } else {
      setStep((prev) => prev + (final[val + 1] - final[val]));
    }
  }

  function handleBack() {
    const val = final.indexOf(stepFinalData);
    if (val === 0) {
      setStep(1);
    } else {
      setStep((prev) => prev - (final[val] - final[val - 1]));
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
    dispatch(info(final1));
  }, [final1, dispatch]);

  return (
    <Box>
      {isAnyDataSelected ? (
        ipWeb.map((web) => (
          <Box key={web.ip}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ position: "relative", left: 310, bottom: 10 }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Database"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="File"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="None"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Calibri",
                  position: "relative",
                  left: 365,
                  bottom: 10,
                }}
              >
                Database Input
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Host"
                    sx={{ m: 0.5, width: 410 }}
                    name="dbname"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  ></TextField>
                  <TextField
                    label="Username"
                    sx={{ m: 0.5, width: 410 }}
                    name="dbname"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  ></TextField>
                  <FormControl>
                    <InputLabel sx={{ m: 0.5 }} shrink={true}>
                      Type
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type"
                      name="type"
                      size="small"
                      notched="true"
                      sx={{ m: 0.5, width: 410 }}
                    >
                      <MenuItem value={"MySql"}>MySql</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        label="Port"
                        sx={{ m: 0.5, width: 410 }}
                        name="dbname"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                      <TextField
                        type="password"
                        label="Password"
                        sx={{ m: 0.5, width: 410 }}
                        name="dbname"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ position: "relative", left: 100 }}>
                  {web.ip}
                </Typography>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      left: 70,
                    }}
                  >
                    <Typography
                      sx={{ position: "relative", top: 20, right: 60 }}
                    >
                      Auth Error
                    </Typography>
                    <TextField
                      label="File Path"
                      sx={{ m: 2, width: 410, position: "relative", right: 30 }}
                      name="dbname"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    <Typography
                      sx={{ position: "relative", top: 20, right: 60 }}
                    >
                      Trade Error
                    </Typography>
                    <TextField
                      label="File Path"
                      sx={{ m: 2, width: 410, position: "relative", right: 34 }}
                      name="dbname"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    ></TextField>
                  </Box>
                </Box>
              </Box>
            </Box>
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
                sx={{ m: 2, width: 250, position: "relative", right: 30 }}
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
                sx={{ m: 2, width: 330, position: "relative", right: 45 }}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorOutlineIcon color="black" />
                    </InputAdornment>
                  ),
                }}
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
                sx={{ m: 2, width: 250, position: "relative", right: 30 }}
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
                sx={{ m: 2, width: 330, position: "relative", right: 45 }}
                size="small"
                placeholder="select * from table_name Limit 0.10"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorOutlineIcon color="black" />
                    </InputAdornment>
                  ),
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
            onClick={handleBack}
            sx={{ mr: 1, fontWeight: 700 }}
          >
            Back
          </Button>

          <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp4;
