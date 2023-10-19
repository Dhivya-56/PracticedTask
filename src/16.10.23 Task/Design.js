import React, { useState } from "react";
import Data from "./Data";
import { Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import { useSelector } from "react-redux";
import Tab from "./Tab";
import IPTable from "./Samp";
import Samp2 from "./Samp2";
import Samp3 from "./Samp3";
import Samp4 from "./Samp4";
const STEPS = ["Setup Exchange", "Setup Application", "Web", "Servers"];

const Design = () => {
  const selector = useSelector((state) => state.Task);
  console.log(selector);
  const [activeStep, setActiveStep] = useState(0);
  const [butn, setButn] = useState(true);
  const Checkbox = selector.some(
    (item) =>
      item.exchange &&
      Object.values(item.exchange).some((value) => value !== undefined)
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
    <Box
      component="div"
      sx={{
        border: "1px solid black",
        width: 700,
        m: "auto",
        position: "relative",
        top: 50,
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {STEPS.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box>
          <IPTable checkbox={Checkbox} step={activeStep}  setStep={setActiveStep} nextFun={handleNext}/>
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <Samp2 checkbox={Checkbox} step={activeStep}  setStep={setActiveStep} nextFun={handleNext} backFun={handleBack}/>
        </Box>
      )}
      {activeStep === 2 && (
        <Box>
          <Samp4 checkbox={Checkbox} step={activeStep}  setStep={setActiveStep} nextFun={handleNext} backFun={handleBack}/>
        </Box>
      )}
      {activeStep === 3 && (
        <Box>
          <Samp3 checkbox={Checkbox} step={activeStep}  setStep={setActiveStep} nextFun={handleNext} backFun={handleBack} />
        </Box>
      )}

      <div>
       
      </div>
    </Box>
  );
};

export default Design;
