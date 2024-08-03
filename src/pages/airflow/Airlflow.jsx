import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Airflow.css";
import { createDag, unpauseDag, pauseDag, triggerDag } from '../../service/airflowService';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../features/alert/alertSlice';

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

const Airflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dagName, setDagName] = useState('');
  const [schedule, setSchedule] = useState('');
  const [startDate, setStartDate] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [isPaused, setIsPaused] = useState(true);

  const dispatch = useDispatch();

  // State to hold review data
  const [reviewData, setReviewData] = useState({
    dagName: '',
    schedule: '',
    startDate: '',
    file: null,
    code: '',
    isPaused: true
  });

  const handleNext = () => {
    if (activeStep === 0) {
      // Update reviewData with current step values
      setReviewData({
        dagName,
        schedule,
        startDate,
        file,
        code,
        isPaused
      });
    }
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmitCreateDag = async () => {
    const formData = new FormData();
    formData.append('dag_id', dagName);
    formData.append('schedule', schedule);
    formData.append('start_date', startDate);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await createDag(formData);
      if (response) {
        console.log('DAG Created:', response);
        dispatch(setAlert({type : 'success', message: 'DAG created successfully'}))
        handleNext(); // Move to the next step
      }
    } catch (error) {
        dispatch(setAlert({type : 'error', message: 'Failed to create DAG'}))
      console.error('Error creating DAG:', error);
    }
  };

  const handlePauseDag = async () => {
    const payload = {
      dag_id: dagName
    };

    try {
      const response = await pauseDag(payload);
      if (response) {
        console.log('DAG Paused:', response);
        dispatch(setAlert({type : 'success', message: 'DAG paused successfully'}))
        setIsPaused(true); // Set pause state
      }
    } catch (error) {
        dispatch(setAlert({type : 'success', message: 'Failed to pause DAG'}))
      console.error('Error pausing DAG:', error);
    }
  };

  const handleUnpauseDag = async () => {
    const payload = {
      dag_id: dagName
    };

    try {
      const response = await unpauseDag(payload);
      if (response) {
        dispatch(setAlert({type : 'success', message: 'DAG unpaused successfully'}))
        console.log('DAG Unpaused:', response);
        setIsPaused(false); // Set unpause state
      }
    } catch (error) {
        dispatch(setAlert({type : 'success', message: 'Failed to unpause DAG'}))

      console.error('Error unpausing DAG:', error);
    }
  };

  const handleSubmitTriggerDag = async () => {
    const triggerDagPayload = {
      dag_id: dagName
    };

    try {
      const response = await triggerDag(triggerDagPayload);
      if (response) {
        dispatch(setAlert({type : 'success', message: 'DAG triggered successfully'}))
        console.log('DAG Triggered:', response);
      }
    } catch (error) {
        dispatch(setAlert({type : 'success', message: 'Failed to trigger DAG'}))
      console.error('Error triggering DAG:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: '80vw', height: '75vh', margin: 'auto', mt: 4 }}>
        <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper sx={{ padding: 3 }}>
          {activeStep === 0 && (
            <div>
              <Typography variant="h6" gutterBottom>Create a DAG</Typography>
              <TextField
                label="DAG Name"
                value={dagName}
                onChange={(e) => setDagName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Schedule</InputLabel>
                <Select
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="0 0 * * *">Daily at midnight (IST)</MenuItem>
                  <MenuItem value="0 6 * * *">Daily at 6 AM (IST)</MenuItem>
                  <MenuItem value="0 12 * * *">Daily at 12 PM (IST)</MenuItem>
                  <MenuItem value="0 0 * * 1">Weekly on Mondays at midnight (IST)</MenuItem>
                  <MenuItem value="0 * * * *">Hourly</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="body1" marginY={2}>Upload Python File:</Typography>
              <TextField
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                fullWidth
                margin="normal"
              />
              <Typography variant="body1" marginY={2}>Or write Python code:</Typography>
              <TextField
                multiline
                rows={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                margin="normal"
                placeholder="Write your Python code here..."
              />
              <Button
                variant="contained"
                onClick={handleSubmitCreateDag}
                sx={{ marginTop: 2 }}
              >
                Create DAG
              </Button>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <Typography variant="h6" gutterBottom>Configure DAG</Typography>
              <Button
                variant="contained"
                onClick={handlePauseDag}
                // disabled={isPaused}
                sx={{ marginRight: 2 }}
              >
                Pause DAG
              </Button>
              <Button
                variant="contained"
                onClick={handleUnpauseDag}
                // disabled={!isPaused}
              >
                Unpause DAG
              </Button>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Typography variant="h6" gutterBottom>Review DAG</Typography>
              <Typography variant="body1"><strong>DAG Name:</strong> {reviewData.dagName}</Typography>
              <Typography variant="body1"><strong>Schedule:</strong> {reviewData.schedule}</Typography>
              <Typography variant="body1"><strong>Start Date:</strong> {reviewData.startDate}</Typography>
              <Typography variant="body1"><strong>File:</strong> {reviewData.file ? reviewData.file.name : 'None'}</Typography>
              <Typography variant="body1"><strong>Python Code:</strong> {reviewData.code}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {reviewData.isPaused ? 'Paused' : 'Active'}</Typography>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <Typography variant="h6" gutterBottom>Activate DAG</Typography>
              <Button
                variant="contained"
                onClick={handleSubmitTriggerDag}
              >
                Trigger DAG
              </Button>
            </div>
          )}
          <Box sx={{ marginTop: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mr: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Airflow;
