import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const steps = ['Define', 'Configure', 'Review', 'Activate'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#212121',
    },
    text: {
      primary: '#fff',
    },
  },
});

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [workflowName, setWorkflowName] = useState('');
  const [pythonScript, setPythonScript] = useState('');
  const [cronSchedule, setCronSchedule] = useState('');
  const [emailNotifications, setEmailNotifications] = useState('');
  const [maxRetries, setMaxRetries] = useState('');
  const [retryDelay, setRetryDelay] = useState('');
  const [timeout, setTimeout] = useState('');
  const [saveToPostgreSQL, setSaveToPostgreSQL] = useState(false);
  const [dbName, setDbName] = useState('');
  const [tableName, setTableName] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // Reset all form fields if needed
  };

  const handleCheckboxChange = (event) => {
    setSaveToPostgreSQL(event.target.checked);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: '80vw', height:'75vh',  margin: 'auto', mt: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Define Workflow</Typography>
                <TextField
                  label="Workflow Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  label="Python Script"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={pythonScript}
                  onChange={(e) => setPythonScript(e.target.value)}
                  sx={{ textarea: { color: 'white' } }}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Configure Workflow</Typography>
                <TextField
                  label="Cron Schedule"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={cronSchedule}
                  onChange={(e) => setCronSchedule(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  label="Email for Notifications"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  label="Max Retries"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={maxRetries}
                  onChange={(e) => setMaxRetries(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  label="Retry Delay (minutes)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={retryDelay}
                  onChange={(e) => setRetryDelay(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  label="Timeout (minutes)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                  sx={{ input: { color: 'white' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={saveToPostgreSQL}
                      onChange={handleCheckboxChange}
                      sx={{ color: 'white' }}
                    />
                  }
                  label="Save to PostgreSQL"
                  sx={{ color: 'white' }}
                />
                {saveToPostgreSQL && (
                  <>
                    <TextField
                      label="Database Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={dbName}
                      onChange={(e) => setDbName(e.target.value)}
                      sx={{ input: { color: 'white' } }}
                    />
                    <TextField
                      label="Table Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      sx={{ input: { color: 'white' } }}
                    />
                  </>
                )}
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Review Workflow</Typography>
                <Typography>Workflow Name: {workflowName}</Typography>
                <Typography>Python Script: {pythonScript}</Typography>
                <Typography>Cron Schedule: {cronSchedule}</Typography>
                <Typography>Email for Notifications: {emailNotifications}</Typography>
                <Typography>Max Retries: {maxRetries}</Typography>
                <Typography>Retry Delay (minutes): {retryDelay}</Typography>
                <Typography>Timeout (minutes): {timeout}</Typography>
                <Typography>Save to PostgreSQL: {saveToPostgreSQL ? 'Yes' : 'No'}</Typography>
                {saveToPostgreSQL && (
                  <>
                    <Typography>Database Name: {dbName}</Typography>
                    <Typography>Table Name: {tableName}</Typography>
                  </>
                )}
              </Box>
            )}
            {activeStep === 3 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Activate Workflow</Typography>
                <Typography>Notifications and progress will be shown here.</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Activate Workflow
                </Button>
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default StepperForm;
