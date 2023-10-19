import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { info } from '../WebReducers';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const steps = ['Basic Info', 'Additional Info', 'Success'];

export default function SignUp() {
  const selector = useSelector((state) => state.Anime.value);
  console.log(selector)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState(selector);

  const [validationErrors, setValidationErrors] = React.useState({});
  const emailValid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,10})$/;
  const passWordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%]).{8,20}$/;

  const handleNext = () => {

    if (validateForm()) {

      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      if (activeStep === steps.length - 1) {
        navigate('/');

      }
    }
    dispatch(info(formData));
   

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);

    setValidationErrors({});
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    setValidationErrors({ ...validationErrors, [field]: '' });
  };



  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (activeStep === 0) {
      if (!formData.email || !emailValid.test(formData.email)) {
        errors.email = 'Invalid email address';
        isValid = false;
      }
      if (!formData.pass || !passWordValid.test(formData.pass)) {
        errors.pass = 'Password must meet the criteria';
        isValid = false;
      }
      if (formData.pass !== formData.confirmpass) {
        errors.confirmpass = 'Password do not match';
        isValid = false;
      }


    }
    if (activeStep === 1) {
      if (!formData.fname) {
        errors.fname = 'Required Field';
        isValid = false;
      }
      if (!formData.lname) {
        errors.lname = 'Required Field';
        isValid = false;
      }
      if (!formData.phno) {
        errors.phno = 'Required Field';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;

  };

  return (
    <Box sx={{ width: '100%', marginTop: 5 }}>
      <Box sx={{ border: '1px solid black', width: 650, position: 'relative', left: 270, backgroundColor: '#ccff90' }}>
        <Stepper activeStep={activeStep} >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel ></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === steps.length ? (

        ""
      ) : (
        <Stack sx={{ border: '1px solid black', width: 700, margin: 'auto', marginTop: 3, borderRadius: 4, boxShadow: 20, backgroundColor: '#80dfff' }}>
          <Typography variant='h3' sx={{ textAlign: 'center', marginBottom: 5 }}>Sign Up</Typography>
          <Box sx={{ width: 600, position: 'relative', margin: 'auto', }}>
            {activeStep === 0 && (
              <Box>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  type="password"
                  value={formData.pass}
                  onChange={handleInputChange('pass')}
                  required
                  error={Boolean(validationErrors.pass)}
                  helperText={validationErrors.pass}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  type="password"
                  value={formData.confirmpass}
                  onChange={handleInputChange('confirmpass')}
                  required
                  error={Boolean(validationErrors.confirmpass)}
                  helperText={validationErrors.confirmpass}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  value={formData.fname}
                  error={Boolean(validationErrors.fname)}
                  helperText={validationErrors.fname}
                  onChange={handleInputChange('fname')}
                  required
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  value={formData.lname}
                  error={Boolean(validationErrors.lname)}
                  helperText={validationErrors.lname}
                  onChange={handleInputChange('lname')}
                  required
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  sx={{ margin: 1 }}
                  value={formData.phno}
                  maxlength="10"
                  error={Boolean(validationErrors.phno)}
                  helperText={validationErrors.phno}
                  onChange={handleInputChange('phno')}
                  required
                />
              </Box>
            )}{activeStep === 2 && (
              <Box>
                <Typography sx={{ textAlign: 'center', fontSize: 20, color: 'green', fontFamily: 'sans-serif', fontWeight: 900 }}>
                  Successfully Registered!
                </Typography>
                <Typography sx={{ textAlign: 'center', color: 'green', fontSize: 30 }}><CheckCircleOutlineIcon /></Typography>

              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, fontSize: 16 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto', fontSize: 18 }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}


