import React, { useState } from "react";
import Data from "./Data";
import { useMediaQuery, Grid, Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { StepLabel } from "@mui/material";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import { useSelector } from "react-redux";

import IPTable from "./Step1";
import Samp2 from "./Step2";
import Samp3 from "./Step3";
import Samp4 from "./Step4";
import Samp5 from "./Step5";
import { useEffect } from "react";
const STEPS = [
  "Setup Exchange",
  "Setup Application",
  "WEB Servers",
  "OMS Servers",
  "RMS Servers",
  "Exchange Connectivity",
  "Database Servers",

  "Summary",
];
const MOVE = [];
const Design = () => {
  const [stepping, setStepping] = useState(MOVE);
  const [database, setDatabase] = useState();
  const [file, setFile] = useState();
  const stepper = Object.values(stepping);

  const stepData = stepper.sort((a, b) => a - b);

  const selector = useSelector((state) => state.Task);

  const [activeStep, setActiveStep] = useState(0);
  const filter = selector.filter(
    (item) => Object.keys(item?.exchange || {}).length > 0
  );

  const Checkbox = selector.some(
    (item) =>
      item.exchange &&
      Object.keys(item.exchange)?.some((value) => value !== undefined)
  );

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  useEffect(() => {
    setDatabase(selector);
    setFile(selector);
  }, [selector]);
  return (
    <Box sx={{ width: 1000, m: "auto", position: "relative", top: 10 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 2, display: "flex" }}
      >
        {STEPS.map((label, index) => (
          <Step key={label}>
            <StepLabel color="inherit" onClick={handleStep(index)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        component="div"
        sx={{
          width: 800,
          m: "auto",
          position: "relative",
          top: 20,
        }}
      >
        {activeStep === 0 && (
          <Box>
            <IPTable checkbox={Checkbox} setStep={setActiveStep} />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Samp2
              step={activeStep}
              final={stepData}
              setStepping={setStepping}
              setStep={setActiveStep}
              filteredData={filter}
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Samp4
              step={activeStep}
              database1={database}
              setDatabase1={setDatabase}
              file1={file}
              setFile1={setFile}
              final={stepData}
              setStep={setActiveStep}
              data={"web"}
            />
          </Box>
        )}
        {activeStep === 3 && (
          <Box>
            <Samp4
              final={stepData}
              database1={database}
              setDatabase1={setDatabase}
              file1={file}
              setFile1={setFile}
              step={activeStep}
              setStep={setActiveStep}
              data={"oms"}
            />
          </Box>
        )}
        {activeStep === 4 && (
          <Box>
            <Samp4
              step={activeStep}
              database1={database}
              setDatabase1={setDatabase}
              file1={file}
              setFile1={setFile}
              final={stepData}
              setStep={setActiveStep}
              data={"rms"}
            />
          </Box>
        )}
        {activeStep === 5 && (
          <Box>
            <Samp4
              checkbox={Checkbox}
              step={activeStep}
              database1={database}
              setDatabase1={setDatabase}
              file1={file}
              setFile1={setFile}
              stepp={stepping}
              final={stepData}
              setStepping={setStepping}
              setStep={setActiveStep}
              data={"ex_adptr"}
            />
          </Box>
        )}
        {activeStep === 6 && (
          <Box>
            <Samp5 step={activeStep} final={stepData} setStep={setActiveStep} />
          </Box>
        )}
        {activeStep === 7 && (
          <Box>
            <Samp3
              step={activeStep}
              final={stepData}
              filteredData={filter}
              setStep={setActiveStep}
            />
          </Box>
        )}

        <div></div>
      </Box>
    </Box>
  );
};

export default Design;
