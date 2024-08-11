// import React, { useState } from "react";
// import {
//   Box,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   TextField,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import "./Airflow.css";
// import {
//   createDag,
//   unpauseDag,
//   pauseDag,
//   triggerDag,
//   modifyDag,
//   saveUrlsToDatabase,
// } from "../../service/airflowService";
// import { useDispatch } from "react-redux";
// import { setAlert } from "../../features/alert/alertSlice";
// import DownloadingIcon from "@mui/icons-material/Downloading";
// import { LoadingButton } from "@mui/lab";
// import SendIcon from "@mui/icons-material/Send";

// const steps = ["Upload Urls", "Define", "Configure", "Review", "Activate"];

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#121212",
//       paper: "#212121",
//     },
//     text: {
//       primary: "#fff",
//     },
//   },
// });

// const Airflow = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [dagName, setDagName] = useState("");
//   const [schedule, setSchedule] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [file, setFile] = useState(null);
//   const [code, setCode] = useState("");
//   const [isPaused, setIsPaused] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [urls, setUrls] = useState([]);
//   const [currentUrl, setCurrentUrl] = useState("");

//   const handleAddUrl = () => {
//     if (urls.length >= 20) {
//       dispatch(
//         setAlert({ type: "error", message: "You can only add up to 20 URLs" })
//       );
//       return;
//     }
//     if (currentUrl) {
//       setUrls([...urls, currentUrl]);
//       setCurrentUrl("");
//     }
//   };

//   const handleRemoveUrl = (index) => {
//     setUrls(urls.filter((_, i) => i !== index));
//   };

//   const handleSaveUrls = async () => {
//     try {
//       const response = await saveUrlsToDatabase({
//         userId: "hariharan",
//         tabId: 2, // specify the tab-id
//         urls,
//       });
//       dispatch(
//         setAlert({ type: "success", message: "URLs saved successfully" })
//       );
//     } catch (error) {
//       dispatch(setAlert({ type: "error", message: "Failed to save URLs" }));
//     }
//   };

//   const dispatch = useDispatch();

//   // State to hold review data
//   const [reviewData, setReviewData] = useState({
//     dagName: "",
//     schedule: "",
//     startDate: "",
//     file: null,
//     code: "",
//     isPaused: true,
//   });

//   const handleNext = () => {
//     if (activeStep === 0) {
//       // Update reviewData with current step values
//       setReviewData({
//         dagName,
//         schedule,
//         startDate,
//         file,
//         code,
//         isPaused,
//       });
//     }
//     console.log(activeStep, "jjjjjjjj");
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleCreatePythonFile = async () => {
//     const createPythonFilePayload = {
//       user: "hariharan",
//     };
//     try {
//       const response = await modifyDag(createPythonFilePayload);
//       setAlert({ type: "success", message: "File created successfully" });

//       if (response) {
//         setAlert({ type: "success", message: "File created successfully" });
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setAlert({ type: "success", message: "Failed to create file" });
//     }
//   };
//   const handleDownloadPythonFile = async () => {};

//   const handleSubmitCreateDag = async () => {
//     const formData = new FormData();
//     formData.append("dag_id", dagName);
//     formData.append("schedule", schedule);
//     formData.append("start_date", startDate);
//     formData.append("user_id", "hariharan");
//     if (file) {
//       formData.append("file", file);
//     }

//     try {
//       const response = await createDag(formData);
//       setLoading(false);
//       console.log(response, "data");
//       if (response) {
//         console.log("DAG Created:", response);
//         dispatch(
//           setAlert({ type: "success", message: "DAG created successfully" })
//         );
//         handleNext();
//       }
//     } catch (error) {
//       dispatch(setAlert({ type: "error", message: "Failed to create DAG" }));
//       setLoading(false);
//       handleNext();
//       console.error("Error creating DAG:", error);
//     }
//   };

//   const handlePauseDag = async () => {
//     const payload = {
//       dag_id: dagName,
//     };

//     try {
//       const response = await pauseDag(payload);
//       setLoading(false);
//       if (response) {
//         console.log("DAG Paused:", response);
//         dispatch(
//           setAlert({ type: "success", message: "DAG paused successfully" })
//         );
//         setIsPaused(true); // Set pause state
//       }
//     } catch (error) {
//       dispatch(setAlert({ type: "success", message: "Failed to pause DAG" }));
//       setLoading(false);
//       console.error("Error pausing DAG:", error);
//     }
//   };

//   const handleUnpauseDag = async () => {
//     const payload = {
//       dag_id: dagName,
//     };

//     try {
//       const response = await unpauseDag(payload);
//       setLoading(false);
//       if (response) {
//         dispatch(
//           setAlert({ type: "success", message: "DAG unpaused successfully" })
//         );
//         console.log("DAG Unpaused:", response);
//         setIsPaused(false); // Set unpause state
//       }
//     } catch (error) {
//       dispatch(setAlert({ type: "success", message: "Failed to unpause DAG" }));
//       setLoading(false);

//       console.error("Error unpausing DAG:", error);
//     }
//   };

//   const handleSubmitTriggerDag = async () => {
//     const triggerDagPayload = {
//       dag_id: dagName,
//     };

//     try {
//       const response = await triggerDag(triggerDagPayload);
//       setLoading(false);
//       if (response) {
//         dispatch(
//           setAlert({ type: "success", message: "DAG triggered successfully" })
//         );
//         handleNext();
//         console.log("DAG Triggered:", response);
//       }
//     } catch (error) {
//       dispatch(setAlert({ type: "success", message: "Failed to trigger DAG" }));
//       setLoading(false);
//       handleNext();
//       console.error("Error triggering DAG:", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Box sx={{ width: "80vw", height: "75vh", margin: "auto", mt: 4 }}>
//         <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         <Paper sx={{ padding: 3 }}>
//           {activeStep === 0 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Enter URLs
//               </Typography>
//               <div
//                 className="url-input-group"
//                 style={{ display: "flex", gap: "10px", alignItems: "center" }}
//               >
//                 <TextField
//                   label="Add URL"
//                   value={currentUrl}
//                   onChange={(e) => setCurrentUrl(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   style={{ flex: 2 }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleAddUrl}
//                   sx={{ marginTop: 2 }}
//                   style={{  whiteSpace: "nowrap" }}
//                 >
//                   Add URL
//                 </Button>
//               </div>
//               <Typography variant="body2" sx={{ marginTop: 2 }}>
//                 You can add up to 20 URLs.
//               </Typography>
//               <ul className="url_container">
//                 {urls.length > 0 && urls.map((url, index) => (
//                   <li className="list_container" key={index}>
//                   <span>{index+1}. </span> {url}{" "}
//                     <Button onClick={() => handleRemoveUrl(index)}>
//                       Remove
//                     </Button>
//                   </li>
//                 ))}
//                 {urls.length == 0 && 
//                 <div>
//                   No Urls added yet
//                 </div>}
//               </ul>
//               <Button
//                 variant="contained"
//                 onClick={handleSaveUrls}
//                 sx={{ marginTop: 2 }}
//                 disabled={urls.length === 0}
//               >
//                 Save URLs
//               </Button>
//             </div>
//           )}

//           {activeStep === 1 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Create a DAG
//               </Typography>

//               <div className="btn-group-file">
//                 {/* <Button
//                 variant="contained"
//                 onClick={handleCreatePythonFile}
//                 sx={{ marginTop: 2 }}
//               >
//                 Create Python File
//               </Button> */}

//                 <LoadingButton
//                   size="small"
//                   onClick={() => handleCreatePythonFile()}
//                   loading={loading}
//                   loadingIndicator="Loading…"
//                   endIcon={<SendIcon />}
//                   sx={{ marginTop: 2 }}
//                   variant="outlined"
//                 >
//                   <span> Create Python File</span>
//                 </LoadingButton>
//                 {/* 
//               <LoadingButton
//                 size="small"
//                 onClick={() => handleDownloadPythonFile()}
//                 loading={loading}
//                 loadingIndicator="Loading…"
//                 sx={{ marginTop: 2 }}
//                 variant="outlined"
//               >
//                 <span>  <DownloadingIcon/></span>
//               </LoadingButton> */}

//                 {/* <Button
//                 variant="contained"
//                 onClick={handleDownloadPythonFile}
//                 sx={{ marginTop: 2 }}
//               >
//                 <DownloadingIcon/>
//               </Button> */}
//               </div>
//               <TextField
//                 label="DAG Name"
//                 value={dagName}
//                 onChange={(e) => setDagName(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Schedule</InputLabel>
//                 <Select
//                   value={schedule}
//                   onChange={(e) => setSchedule(e.target.value)}
//                 >
//                   <MenuItem value="">None</MenuItem>
//                   <MenuItem value="0 6 * * *">Daily at 6 AM (IST)</MenuItem>
//                   <MenuItem value="0 0 * * *">Daily at midnight (IST)</MenuItem>
//                   <MenuItem value="0 12 * * *">Daily at 12 PM (IST)</MenuItem>
//                   <MenuItem value="0 0 * * 1">
//                     Weekly on Mondays at midnight (IST)
//                   </MenuItem>
//                   <MenuItem value="0 * * * *">Hourly</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />

//               {/* <Typography variant="body1" marginY={2}>
//                 Or write Python code:
//               </Typography>
//               <TextField
//                 multiline
//                 rows={4}
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 placeholder="Write your Python code here..."
//               /> */}

//               <LoadingButton
//                 size="small"
//                 onClick={() => handleSubmitCreateDag()}
//                 loading={loading}
//                 loadingIndicator="Loading…"
//                 sx={{ marginTop: 2 }}
//                 endIcon={<SendIcon />}
//                 variant="outlined"
//               >
//                 <span>Create DAG</span>
//               </LoadingButton>
//             </div>
//           )}
//           {activeStep === 2 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Configure DAG
//               </Typography>
//               <div className="btn-group-file">
//                 <Button
//                   variant="contained"
//                   onClick={handleUnpauseDag}
//                   // disabled={!isPaused}
//                 >
//                   Unpause DAG
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handlePauseDag}
//                   // disabled={isPaused}
//                   sx={{ marginRight: 2 }}
//                 >
//                   Pause DAG
//                 </Button>
//               </div>
//             </div>
//           )}
//           {activeStep === 3 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Review DAG
//               </Typography>
//               <Typography variant="body1">
//                 <strong>DAG Name:</strong> {reviewData.dagName}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Schedule:</strong> {reviewData.schedule}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Start Date:</strong> {reviewData.startDate}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>File:</strong>{" "}
//                 {reviewData.file ? reviewData.file.name : "None"}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Python Code:</strong> {reviewData.code}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Status:</strong>{" "}
//                 {reviewData.isPaused ? "Paused" : "Active"}
//               </Typography>
//             </div>
//           )}
//           {activeStep === 4 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Activate DAG
//               </Typography>
//               <Button variant="contained" onClick={handleSubmitTriggerDag}>
//                 Trigger DAG
//               </Button>
//             </div>
//           )}
//           <Box sx={{ marginTop: 2 }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
//               {activeStep === steps.length - 1 ? "Finish" : "Next"}
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Airflow;


import React, { useEffect, useState } from "react";
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
  FormControl,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../features/alert/alertSlice";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DownloadingIcon from "@mui/icons-material/Downloading";
import {
  createDag,
  unpauseDag,
  pauseDag,
  triggerDag,
  saveUrlsToDatabase,
  getUrlsToDatabase,
} from "../../service/airflowService";
import "./Airflow.css";

const steps = ["Upload Urls", "Define", "Configure", "Review", "Activate"];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#212121",
    },
    text: {
      primary: "#fff",
    },
  },
});

const Airflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dagName, setDagName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [isPaused, setIsPaused] = useState(true);
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [loadingSaveUrls, setLoadingSaveUrls] = useState(false);
  const [loadingCreateDag, setLoadingCreateDag] = useState(false);
  const [loadingPauseDag, setLoadingPauseDag] = useState(false);
  const [loadingUnpauseDag, setLoadingUnpauseDag] = useState(false);
  const [loadingTriggerDag, setLoadingTriggerDag] = useState(false);
  const [reviewData, setReviewData] = useState({
        dagName: "",
        schedule: "",
        startDate: "",
        file: null,
        code: "",
        isPaused: true,
      })

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchUrls = async () => {
      if (userInfo?.user?.id) {
        try {
          const fetchedUrls = await getUrlsToDatabase(userInfo?.user?.id);
          setUrls(fetchedUrls?.urls || []); 
          setCurrentUrl(""); 
        } catch (error) {
          console.error('Error fetching URLs:', error);
        }
      }
    };
  
    fetchUrls();
  
    // No cleanup function needed here, so we don't return anything.
  }, [userInfo?.user?.id]);

  const handleAddUrl = () => {
    if (urls.length >= 20) {
      dispatch(
        setAlert({ type: "error", message: "You can only add up to 20 URLs" })
      );
      return;
    }
    if (currentUrl) {
      setUrls([...urls, currentUrl]);
      setCurrentUrl("");
    }
  };

  const handleRemoveUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleSaveUrls = async () => {
    setLoadingSaveUrls(true);
    try {
      await saveUrlsToDatabase({
        userId: `${userInfo?.user?.id}`,
        tabName: "tab_page_speed",
        urls,
      });
      dispatch(
        setAlert({ type: "success", message: "URLs saved successfully" })
      );
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Failed to save URLs" }));
    } finally {
      setLoadingSaveUrls(false);
    }
  };

  const handleCreatePythonFile = async () => {
    // Your logic here
  };

  const handleSubmitCreateDag = async () => {
    setLoadingCreateDag(true);
    const formData = new FormData();
    formData.append("dag_id", dagName);
    formData.append("schedule", schedule);
    formData.append("start_date", startDate);
    formData.append("user_id", "hariharan");
    if (file) {
      formData.append("file", file);
    }

    try {
      await createDag(formData);
      dispatch(
        setAlert({ type: "success", message: "DAG created successfully" })
      );
      handleNext();
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Failed to create DAG" }));
    } finally {
      setLoadingCreateDag(false);
    }
  };

  const handlePauseDag = async () => {
    setLoadingPauseDag(true);
    const payload = { dag_id: dagName };

    try {
      await pauseDag(payload);
      dispatch(
        setAlert({ type: "success", message: "DAG paused successfully" })
      );
      setIsPaused(true);
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Failed to pause DAG" }));
    } finally {
      setLoadingPauseDag(false);
    }
  };

  const handleUnpauseDag = async () => {
    setLoadingUnpauseDag(true);
    const payload = { dag_id: dagName };

    try {
      await unpauseDag(payload);
      dispatch(
        setAlert({ type: "success", message: "DAG unpaused successfully" })
      );
      setIsPaused(false);
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Failed to unpause DAG" }));
    } finally {
      setLoadingUnpauseDag(false);
    }
  };

  const handleSubmitTriggerDag = async () => {
    setLoadingTriggerDag(true);
    const triggerDagPayload = { dag_id: dagName };

    try {
      await triggerDag(triggerDagPayload);
      dispatch(
        setAlert({ type: "success", message: "DAG triggered successfully" })
      );
      handleNext();
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Failed to trigger DAG" }));
    } finally {
      setLoadingTriggerDag(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      setReviewData({
                dagName,
                schedule,
                startDate,
                file,
                code,
                isPaused,
              });
    }
          
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "80vw", height: "75vh", margin: "auto", mt: 4 }}>
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
              <Typography variant="h6" gutterBottom>
                Enter URLs
              </Typography>
              <div
                className="url-input-group"
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <TextField
                  label="Add URL"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  fullWidth
                  margin="normal"
                  style={{ flex: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddUrl}
                  sx={{ marginTop: 2 }}
                >
                  Add URL
                </Button>
              </div>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                You can add up to 20 URLs.
              </Typography>
              <ul className="url_container">
                {urls.length > 0 ? (
                  urls.map((url, index) => (
                    <li className="list_container" key={index}>
                      <span>{index + 1}. </span> {url}{" "}
                      <Button onClick={() => handleRemoveUrl(index)}>
                        Remove
                      </Button>
                    </li>
                  ))
                ) : (
                  <div>No URLs added yet</div>
                )}
              </ul>
              <LoadingButton
                variant="contained"
                onClick={handleSaveUrls}
                sx={{ marginTop: 2 }}
                loading={loadingSaveUrls}
                loadingIndicator="Saving…"
                disabled={urls.length === 0}
              >
                Save URLs
              </LoadingButton>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Create a DAG
              </Typography>
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
                  <MenuItem value="0 6 * * *">Daily at 6 AM (IST)</MenuItem>
                  <MenuItem value="0 0 * * *">Daily at midnight (IST)</MenuItem>
                  <MenuItem value="0 12 * * *">Daily at 12 PM (IST)</MenuItem>
                  <MenuItem value="0 0 * * 1">
                    Weekly on Mondays at midnight (IST)
                  </MenuItem>
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
              <LoadingButton
                size="small"
                onClick={handleSubmitCreateDag}
                loading={loadingCreateDag}
                loadingIndicator="Creating…"
                sx={{ marginTop: 2 }}
                endIcon={<SendIcon />}
                variant="outlined"
              >
                Create DAG
              </LoadingButton>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Configure DAG
              </Typography>
              <div className="btn-group-file">
                <LoadingButton
                  variant="contained"
                  onClick={handleUnpauseDag}
                  loading={loadingUnpauseDag}
                  loadingIndicator="Unpausing…"
                >
                  Unpause DAG
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  onClick={handlePauseDag}
                  loading={loadingPauseDag}
                  loadingIndicator="Pausing…"
                >
                  Pause DAG
                </LoadingButton>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Review DAG
              </Typography>
              <Typography variant="body1">
                <strong>DAG Name:</strong> {reviewData?.dagName}
              </Typography>
              <Typography variant="body1">
                <strong>Schedule:</strong> {reviewData?.schedule}
              </Typography>
              <Typography variant="body1">
                <strong>Start Date:</strong> {reviewData?.startDate}
              </Typography>
              <Typography variant="body1">
                <strong>File:</strong>{" "}
                {reviewData?.file ? reviewData?.file?.name : "None"}
              </Typography>
              <Typography variant="body1">
                <strong>Python Code:</strong> {reviewData?.code}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                {reviewData?.isPaused ? "Paused" : "Active"}
              </Typography>
            </div>
          )}

          {activeStep === 4 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Activate DAG
              </Typography>
              <LoadingButton
                variant="contained"
                onClick={handleSubmitTriggerDag}
                loading={loadingTriggerDag}
                loadingIndicator="Triggering…"
              >
                Trigger DAG
              </LoadingButton>
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
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Airflow;

