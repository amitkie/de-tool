import React from 'react'
import { ThemeProvider, createTheme, CssBaseline, dividerClasses } from '@mui/material';
import StepperForm from '../../components/StepperForm/StepperForm';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const AutomateFlow = () => {
  return (
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StepperForm />
    </ThemeProvider>
  );
}
