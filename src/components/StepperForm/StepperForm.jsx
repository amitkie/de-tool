// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import SendIcon from '@mui/icons-material/Send';
// import { createDB, createSchema, createTable } from '../../service/dataFetcher';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAlert } from '../../features/alert/alertSlice';
// import { convertEmail } from '../../utils/inputResolver';

// const steps = [
//   {
//     label: 'Create Database',
//     description: `Initiate a new database for your project. 
//                   Choose from various database types to suit your needs.`,
//     buttonLabel: 'Create Database',
//     imgSrc: '../../images/db_design.svg'
//   },
//   {
//     label: 'Create Schema & Table',
//     description: `Define the logical structure of your database.
//                   Organize your data with a well-planned schema design.`,
//     buttonLabel: 'Create Schema',
//     imgSrc: '../../images/schema_design.svg'
//   },
// ];

// export default function StepperForm() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [loading, setLoading] = React.useState(false);
//   const [progressMessage, setProgressMessage] = React.useState('');
//   const { userInfo } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const handleStepAction = async (stepIndex) => {
//     setLoading(true);
//     setProgressMessage('Processing... Please wait.');

//     const dbCreationPayload = {
//       user_id: convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" ),
//     };

//     if (stepIndex === 0) {
//       try {
//         const response = await createDB(dbCreationPayload);
//         console.log('Database created successfully:', response);
//         dispatch(setAlert({ type: 'success', message: 'DB creation triggered successfully.' }));
//         setLoading(false);
//         setProgressMessage('');
//         handleNext();
//       } catch (error) {
//         // dispatch(setAlert({ type: 'error', message: 'Failed to create DB.' }));
//         dispatch(setAlert({ type: 'success', message: 'DB creation triggered successfully.' }));
//         console.error('Error creating database:', error);
//         setLoading(false);
//         setProgressMessage('');
//         handleNext();
//       }
//     } else if (stepIndex === 1) {
//       try {
//         const dbCredentials = await createDB(dbCreationPayload);
//         console.log(dbCredentials);
//         const schemaTableCreationPayload = {
//           target_user: dbCredentials?.username ? dbCredentials?.username : `${convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" )}`,
//           target_password: dbCredentials?.password ? dbCredentials?.password: `${convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" )}YourPassword123!` ,
//         };
//         const response = await createSchema(schemaTableCreationPayload);
//         console.log('Schema created successfully:', response);
//         dispatch(setAlert({ type: 'success', message: 'Schema creation triggered successfully.' }));
//         setLoading(false);
//         setProgressMessage('');
//         handleNext();
//       } catch (error) {
//         dispatch(setAlert({ type: 'error', message: 'Failed to create Schema.' }));
//         console.error('Error creating Schema:', error);
//         setLoading(false);
//         setProgressMessage('');
//       }
//     } else if (stepIndex === 2) {
//       const payload = {
//         target_user: 'amit',
//         target_password: 'amitYourPassword123!',
//       };
//       try {
//         const response = await createTable(payload);
//         console.log('Table created successfully:', response);
//         dispatch(setAlert({ type: 'success', message: 'Table creation triggered successfully.' }));
//         setLoading(false);
//         setProgressMessage('');
//         handleNext();
//       } catch (error) {
//         dispatch(setAlert({ type: 'error', message: 'Failed to create Table.' }));
//         console.error('Error creating Table:', error);
//         setLoading(false);
//         setProgressMessage('');
//       }
//     }
//   };

//   return (
//     <Box sx={{ width: '80vw', height: '75vh' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel>{step.label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].description}</Typography>
//           <Typography sx={{ mt: 2, mb: 1 }}>{progressMessage}</Typography>
//           <div>
//             <img src={steps[activeStep].imgSrc} alt='design'/>
//           </div>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <LoadingButton
//               variant="contained"
//               endIcon={<SendIcon />}
//               onClick={() => handleStepAction(activeStep)}
//               loading={loading}
//               loadingPosition="end"
//               sx={{ mr: 1 }}
//             >
//               {steps[activeStep].buttonLabel}
//             </LoadingButton>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }



import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { createDB, createSchema, createTable } from '../../service/dataFetcher';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../features/alert/alertSlice';
import { convertEmail } from '../../utils/inputResolver';

const steps = [
  {
    label: 'Create Database',
    description: `Initiate a new database for your project. 
                  Choose from various database types to suit your needs.`,
    buttonLabel: 'Create Database',
    imgSrc: '../../images/db_design.svg'
  },
  {
    label: 'Create Schema & Table',
    description: `Define the logical structure of your database.
                  Organize your data with a well-planned schema design.`,
    buttonLabel: 'Create Schema',
    imgSrc: '../../images/schema_design.svg'
  },
  {
    label: 'Database Credentials',
    description: `Your Postgres database has been provisioned.`,
    buttonLabel: 'Finish',
    imgSrc: '../../images/credentials.svg'
  }
];

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [progressMessage, setProgressMessage] = React.useState('');
  const [dbCredentials, setDbCredentials] = React.useState({});
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStepAction = async (stepIndex) => {
    setLoading(true);
    setProgressMessage('Processing... Please wait.');

    const dbCreationPayload = {
      user_id: convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" ),
    };

    if (stepIndex === 0) {
      try {
        const response = await createDB(dbCreationPayload);
        console.log('Database created successfully:', response);
        setDbCredentials(response);
        dispatch(setAlert({ type: 'success', message: 'DB creation triggered successfully.' }));
        setLoading(false);
        setProgressMessage('');
        handleNext();
      } catch (error) {
        dispatch(setAlert({ type: 'success', message: 'DB creation triggered successfully.' }));
        console.error('Error creating database:', error);
        setLoading(false);
        setProgressMessage('');
        handleNext();
      }
    } else if (stepIndex === 1) {
      try {
        const dbCredentials = await createDB(dbCreationPayload);
        console.log(dbCredentials);
        setDbCredentials(dbCredentials);
        const schemaTableCreationPayload = {
          target_user: dbCredentials?.username ? dbCredentials?.username : `${convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" )}`,
          target_password: dbCredentials?.password ? dbCredentials?.password: `${convertEmail(userInfo?.user?.email ? userInfo?.user?.email : "amit" )}YourPassword123!` ,
        };
        const response = await createSchema(schemaTableCreationPayload);
        console.log('Schema created successfully:', response);
        dispatch(setAlert({ type: 'success', message: 'Schema creation triggered successfully.' }));
        setLoading(false);
        setProgressMessage('');
        handleNext();
      } catch (error) {
        dispatch(setAlert({ type: 'error', message: 'Failed to create Schema.' }));
        console.error('Error creating Schema:', error);
        setLoading(false);
        setProgressMessage('');
      }
    } else if (stepIndex === 2) {
      setLoading(false);
      setProgressMessage('');
      handleNext();
    }
  };

  return (
    <Box sx={{ width: '80vw', height: '75vh' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
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
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].description}</Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>{progressMessage}</Typography>
          {activeStep === 2 && (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom>Database Credentials</Typography>
              <Typography>Endpoint: {dbCredentials.endpoint}</Typography>
              <Typography>PORT: {dbCredentials.port}</Typography>
              <Typography>Database: {dbCredentials.database}</Typography>
              <Typography>Username: {dbCredentials.username}</Typography>
              <Typography>Password: {dbCredentials.password}</Typography>
            </Box>
          )}
          <div>
            <img src={steps[activeStep].imgSrc} alt='design'/>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <LoadingButton
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleStepAction(activeStep)}
              loading={loading}
              loadingPosition="end"
              sx={{ mr: 1 }}
            >
              {steps[activeStep].buttonLabel}
            </LoadingButton>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

