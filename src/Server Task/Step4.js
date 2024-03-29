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
  listItemButtonClasses,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector, useDispatch } from "react-redux";
import { info } from "../TaskReducer";

const Samp4 = ({
  step,
  data,
  final,
  setStep,
  database1,
  setDatabase1,
  file1,
  setFile1,
}) => {
  const selector = useSelector((state) => state.Task);
  const [final1, setFinal] = useState(selector);
  const dispatch = useDispatch();

  const Web = final1.filter((values) => values.selected_metrics?.[data]);
  const [stepFinalData, setStepfinaldata] = useState(null);

  const [ipWeb, setIpWeb] = useState(Web);

  const [radio, setRadio] = useState(selector);

  function checkData(data) {
    switch (data) {
      case "web":
        return "web_log";
      case "oms":
        return "oms_log";
      case "rms":
        return "rms_log";
      case "ex_adptr":
        return "ex_adptr_log";
      default:
        return null;
    }
  }

  useEffect(() => {
    switch (data) {
      case "web":
        setStepfinaldata(1);
        break;
      case "oms":
        setStepfinaldata(2);
        break;
      case "rms":
        setStepfinaldata(3);
        break;
      case "ex_adptr":
        setStepfinaldata(4);
        break;
    }
  }, [data]);

  function handleBack() {
    const val = final.indexOf(stepFinalData);
    if (val === 0) {
      setStep(1);
    } else {
      setStep((prev) => prev - (final[val] - final[val - 1]));
    }
  }

  const checkData1 = checkData(data);

  const [selectedRadio, setSelectedRadio] = useState(
    Web[0].meta?.[checkData1].log_type
      ? Web[0].meta?.[checkData1].log_type
      : "none"
  );


  function handleInputChange(ip, auth, field, value) {
    setFinal((prevDat) => {
      return prevDat.map((item) => {
        if (item.ip === ip) {
          if (selectedRadio === "database") {
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
        }
        return item;
      });
    });
  }

  function handleNext() {
    const val = final.indexOf(stepFinalData);
    if (val === final.length - 1) {
      setStep(7);
    } else {
      setStep((prev) => prev + (final[val + 1] - final[val]));
    }
  }

  function handleInput1Change(ip, type, field1, value) {
    setFinal((prevDat) => {
      return prevDat.map((item) => {
        if (item.ip === ip) {
          if (selectedRadio === "file") {
            return {
              ...item,
              meta: {
                ...item?.meta,
                [checkData1]: {
                  ...item?.meta?.[checkData1],
                  [type]: {
                    ...item?.meta?.[checkData1]?.[type],
                    [field1]: value,
                  },
                },
              },
            };
          }
        }
        return item;
      });
    });
  }
  function handleRadioChange(event) {
    setSelectedRadio(event.target.value);
  }
  useEffect(() => {
    const update = final1.map((item) => {
      return {
        ...item,
        meta: {
          ...item?.meta,
          [checkData1]: {
            ...item?.meta?.[checkData1],
            log_type: selectedRadio,
          },
        },
      };
    });

    setFinal(update);
    dispatch(info(update));
  }, [selectedRadio]);


  useEffect(() => {
    dispatch(info(final1));
  }, [final1]);

  return (
    <Box>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ position: "relative", left: 310, bottom: 10, color: "#9e9e9e" }}
        >
          <FormControlLabel
            value="database"
            checked={selectedRadio === "database"}
            control={<Radio />}
            onChange={(e) => handleRadioChange(e, "log_type")}
            label="Database"
          />
          <FormControlLabel
            value="file"
            checked={selectedRadio === "file"}
            onChange={(e) => handleRadioChange(e, "log_type")}
            control={<Radio />}
            label="File"
          />
          <FormControlLabel
            value="none"
            checked={selectedRadio === "none" && true}
            onChange={(e) => handleRadioChange(e, "log_type")}
            control={<Radio />}
            label="None"
          />
        </RadioGroup>
      </FormControl>
      {/* DATABASE LOGTYPE */}
      <Box>
        {selectedRadio === "database" && (
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
            <Typography
              sx={{
                mb: 2,
                mt: 0,
                color: "#9e9e9e",
                width: 900,
                fontFamily: "Calibri",
                fontWeight: 550,
              }}
            >
              This selection is valid if the application related data stored in
              the database.Required working database query along with seprarate
              read-only user to collect the data in the following sequence
              'timestamp,server IP,server name,log ID,log
              level,erro,description',and recommended to use query-limit to
              avoid the long execution,Per execution of the data collector will
              process up to 1000 lines from the query output.
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
        )}
      </Box>
      {/* DATABASE LOGTYPE FINISHED */}

      {ipWeb.map((web) => (
        <Box key={web.ip}>
          {selectedRadio === "database" && (
            <Box>
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
          )}
        </Box>
      ))}
      <Box>
        {selectedRadio === "none" && (
          <Box>
            <Typography
              sx={{ textAlign: "center", fontSize: 24, color: "#90a4ae" }}
            >
              No configuration selected for your {[data]} server
            </Typography>
          </Box>
        )}
      </Box>
      {ipWeb.map((item1) => (
        <Box>
          {selectedRadio === "file" && (
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
                File Based Input
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  mt: 0,
                  color: "#9e9e9e",
                  width: 900,
                  fontFamily: "Calibri",
                  fontWeight: 550,
                }}
              >
                Locate the exact file path from the target server in the
                following sequence:"timestamp,server IP,server name,log ID,log
                level,error,description".Per execution of the data collector
                will read up to 1000 lines from the log file and different file
                path per data metrics is not allowed{" "}
              </Typography>
              <Box>
                <Typography sx={{ position: "relative", left: 100 }}>
                  {item1.ip}
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
                      onChange={(e) =>
                        handleInput1Change(
                          item1.ip,
                          "auth_error",
                          "File_path",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={
                        item1.meta?.[checkData1].auth_error.File_path
                      }
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
                      onChange={(e) =>
                        handleInput1Change(
                          item1.ip,
                          "trade_error",
                          "File_path",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={
                        item1.meta?.[checkData1].trade_error.File_path
                      }
                    ></TextField>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      ))}
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
