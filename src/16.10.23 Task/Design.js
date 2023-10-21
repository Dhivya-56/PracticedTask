import React, { useState } from "react";
import Data from "./Data";
import { Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { StepLabel } from "@mui/material";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import { useSelector } from "react-redux";

import IPTable from "./Samp";
import Samp2 from "./Samp2";
import Samp3 from "./Samp3";
import Samp4 from "./Samp4";
import Samp5 from "./Samp5";
const STEPS = [
  "Setup Exchange",
  "Setup Application",
  "Web servers",
  "Oms servers",
  "Rms servers",
  "Exchange Connectivity",
  "Database servers",
  "Summary",
];

const Design = () => {
  const selector = useSelector((state) => state.Task);

  const [activeStep, setActiveStep] = useState(0);

  const Checkbox = selector.some(
    (item) =>
      item.exchange &&
      Object.keys(item.exchange)?.some((value) => value !== undefined)
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: 800, m: "auto", position: "relative", top: 10 }}>
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
            <IPTable
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Samp2
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Samp4
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
              data={"WEB"}
            />
          </Box>
        )}
        {activeStep === 3 && (
          <Box>
            <Samp4
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
              data={"OMS"}
            />
          </Box>
        )}
        {activeStep === 4 && (
          <Box>
            <Samp4
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
              data={"RMS"}
            />
          </Box>
        )}
        {activeStep === 5 && (
          <Box>
            <Samp4
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
              data={"EXC"}
            />
          </Box>
        )}
        {activeStep === 6 && (
          <Box>
            <Samp5
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
            />
          </Box>
        )}
        {activeStep === 7 && (
          <Box>
            <Samp3
              checkbox={Checkbox}
              step={activeStep}
              setStep={setActiveStep}
              nextFun={handleNext}
              backFun={handleBack}
            />
          </Box>
        )}

        <div></div>
      </Box>
    </Box>
  );
};

export default Design;
