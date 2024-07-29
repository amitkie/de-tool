// import React, { useState, useRef } from 'react';
// import * as XLSX from 'xlsx'; 
// import './ScrapperForm.css'; 
// import { getScrappingStatus, startScrapping } from '../../service/userService';
// import { setAlert } from '../../features/alert/alertSlice';
// import { useDispatch } from 'react-redux';
// import { Chip } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// const ScraperForm = () => {
//   const [urls, setUrls] = useState(['']);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [scraperType, setScraperType] = useState('Tweet');
//   const fileInputRef = useRef(null); 
//   const [loading, setLoading] = React.useState(true);

//   const dispatch = useDispatch();

//   const addUrlInput = () => {
//     if (urls.length < 20) {
//       setUrls([...urls, '']); 
//       setErrorMessage(''); 
//     } else {
//       setErrorMessage('Max 20 items can be added'); 
//     }
//   };

//   const removeUrlInput = (index) => {
//     if (urls.length > 1) {
//       const newUrls = [...urls];
//       newUrls.splice(index, 1);
//       setUrls(newUrls);
//       setErrorMessage(''); 
//     }
//   };

//   const handleUrlChange = (index, value) => {
//     const newUrls = [...urls];
//     newUrls[index] = value;
//     setUrls(newUrls);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const binaryString = e.target.result;
//         const workbook = XLSX.read(binaryString, { type: 'binary' });
//         const sheetName = workbook.SheetNames[0]; 
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 

//         const urlsFromExcel = data.flat(); 
//         if (urlsFromExcel.length + urls.length <= 20) {
//           setUrls([...urls, ...urlsFromExcel]); 
//         } else {
//           setErrorMessage('Total URLs cannot exceed 20.'); 
//         }
//       };
//       reader.readAsBinaryString(file);
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); 
//     }
//   };

//   const startScrappingUrls = async () => {
//     const scrapePayload = {
//       brand_handles: urls,
//       start_date: startDate,
//       end_date: endDate,
//       scraping_type: scraperType
//     };
  
//     try {
//       const response = await startScrapping(scrapePayload);
//       console.log(response);
      
//       if (response?.task_id) {
//         const newTasks = [
//           {
//             status: 'Pending',
//             task_id: response.task_id
//           }
//         ];
//         localStorage.setItem('tasks', JSON.stringify(newTasks));
//         setTasks(newTasks);
//         dispatch(setAlert({ type: 'success', message: 'Scrape successful!' }));
//         console.log('Scraping started successfully:', response);
//       } else {
//         dispatch(setAlert({ type: 'error', message: 'Task ID is missing in response!' }));
//         console.error('Error: Task ID is undefined.');
//       }
//     } catch (error) {
//       dispatch(setAlert({ type: 'error', message: 'Failed to Scrape data!' }));
//       console.error('Error starting scraping:', error);
//     }
//   };

//   async function handleClick(id) {
//     setLoading(true);
//     const getStatus = await getScrappingStatus(id);


//   }
  

//   return (
//     <div className="scraper-form">
//       <div className="url_label">
//         <label htmlFor="instagramUrls">URLs/Brands you want to scrape</label>
//       </div>
//       <div className="url_container">
//         {urls.map((url, index) => (
//           <div key={index} className="form-group">
//             <div className="url-inputs">
//               <span>{index + 1}</span>
//               <input
//                 type="text"
//                 id={`instagramUrls${index + 1}`}
//                 value={url}
//                 onChange={(e) => handleUrlChange(index, e.target.value)}
//                 placeholder="Enter URL"
//               />
//               <button className="remove-button" onClick={() => removeUrlInput(index)}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
//                   <path
//                     fill="currentColor"
//                     d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.748.748 0 0 1 1.268.722.75.75 0 0 1-.208.338L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.751.751 0 0 1-1.261-.536.75.75 0 0 1 .201-.524L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="form-group btn-group">
//         <button className="add-button" onClick={addUrlInput} disabled={urls.length >= 20}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
//             <path
//               fill="currentColor"
//               d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 1 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2"
//             />
//           </svg>
//           Add
//         </button>
//         <button className="save-button" onClick={triggerFileInput}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
//             <path
//               fill="currentColor"
//               d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 1 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2"
//             />
//           </svg>
//           Bulk Add
//         </button>
//         <input
//           type="file"
//           accept=".xlsx"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileUpload}
//         />
//       </div>

//       {errorMessage && <span className="text-danger">{errorMessage}</span>}

//       <div className="form-group">
//         <label htmlFor="startDate">Start Date</label>
//         <input 
//           type="date" 
//           id="startDate" 
//           name="startDate" 
//           value={startDate} 
//           onChange={(e) => setStartDate(e.target.value)} 
//         />
//         <span className="date-range-separator">to</span>
//         <label htmlFor="endDate">End Date</label>
//         <input 
//           type="date" 
//           id="endDate" 
//           name="endDate" 
//           value={endDate} 
//           onChange={(e) => setEndDate(e.target.value)} 
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="scraperType">Scraper Type</label>
//         <select 
//           id="scraperType" 
//           name="scraperType" 
//           value={scraperType} 
//           onChange={(e) => setScraperType(e.target.value)}
//         >
//           {/* <option value="Post">Post</option> */}
//           <option value="Tweet">Tweet</option>
//           {/* <option value="Comment">Comment</option> */}
//           <option value="Reply">Reply</option>
//           <option value="Both">Both</option>
//         </select>
//       </div>

//       <button className="save-button" onClick={startScrappingUrls}>▷ Save & Start</button>

//       {tasks && tasks.length > 0 && 
//       <div>
//       Task
//         {tasks?.map((task) => {
//           <div>
//           <LoadingButton
//           size="small"
//           onClick={() => handleClick(task?.task_id)}
//           loading={loading}
//           loadingIndicator="Loading…"
//           variant="outlined"
//         >
//           <span>Fetch data</span>
//         </LoadingButton> <Chip label="primary" color="success" variant="outlined" />

//           </div>
//         })}
//       </div>}
//     </div>
//   );
// };

// export default ScraperForm;



import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'; 
import './ScrapperForm.css'; 
import { getScrappingStatus, startScrapping } from '../../service/userService';
import { setAlert } from '../../features/alert/alertSlice';
import { useDispatch } from 'react-redux';
import { Chip } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ScraperForm = () => {
  const [urls, setUrls] = useState(['']);
  const [errorMessage, setErrorMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scraperType, setScraperType] = useState('Tweet');
  const fileInputRef = useRef(null); 
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addUrlInput = () => {
    if (urls.length < 20) {
      setUrls([...urls, '']); 
      setErrorMessage(''); 
    } else {
      setErrorMessage('Max 20 items can be added'); 
    }
  };

  const removeUrlInput = (index) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
      setErrorMessage(''); 
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 

        const urlsFromExcel = data.flat(); 
        if (urlsFromExcel.length + urls.length <= 20) {
          setUrls([...urls, ...urlsFromExcel]); 
        } else {
          setErrorMessage('Total URLs cannot exceed 20.'); 
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  const startScrappingUrls = async () => {
    const scrapePayload = {
      brand_handles: urls,
      start_date: startDate,
      end_date: endDate,
      scraping_type: scraperType
    };
  
    try {
      const response = await startScrapping(scrapePayload);
      console.log(response);
      
      if (response?.task_id) {
        const newTask = {
          status: 'Pending',
          task_id: response.task_id
        };
        const newTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
        dispatch(setAlert({ type: 'success', message: 'Scrape successful!' }));
        console.log('Scraping started successfully:', response);
      } else {
        dispatch(setAlert({ type: 'error', message: 'Task ID is missing in response!' }));
        console.error('Error: Task ID is undefined.');
      }
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: 'Failed to Scrape data!' }));
      console.error('Error starting scraping:', error);
    }
  };

  const handleClick = async (id) => {
    setLoading(true);
    try {
      const status = await getScrappingStatus(id);
      const updatedTasks = tasks.map((task) => 
        task.task_id === id ? { ...task, status: status.success ? 'Success' : 'Pending' } : task
      );
      setTasks(updatedTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching status:', error);
      setLoading(false);
    }
  };
  
  return (
    <div className="scraper-form">
      <div className="url_label">
        <label htmlFor="instagramUrls">URLs/Brands you want to scrape</label>
      </div>
      <div className="url_container">
        {urls.map((url, index) => (
          <div key={index} className="form-group">
            <div className="url-inputs">
              <span>{index + 1}</span>
              <input
                type="text"
                id={`instagramUrls${index + 1}`}
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="Enter URL"
              />
              <button className="remove-button" onClick={() => removeUrlInput(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.748.748 0 0 1 1.268.722.75.75 0 0 1-.208.338L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.751.751 0 0 1-1.261-.536.75.75 0 0 1 .201-.524L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-group btn-group">
        <button className="add-button" onClick={addUrlInput} disabled={urls.length >= 20}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 1 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2"
            />
          </svg>
          Add
        </button>
        <button className="save-button" onClick={triggerFileInput}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 1 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2"
            />
          </svg>
          Bulk Add
        </button>
        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {errorMessage && <span className="text-danger">{errorMessage}</span>}

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <span className="date-range-separator">to</span>
        <label htmlFor="endDate">End Date</label>
        <input 
          type="date" 
          id="endDate" 
          name="endDate" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="scraperType">Scraper Type</label>
        <select 
          id="scraperType" 
          name="scraperType" 
          value={scraperType} 
          onChange={(e) => setScraperType(e.target.value)}
        >
          <option value="Tweet">Tweet</option>
          <option value="Reply">Reply</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <button className="save-button" onClick={startScrappingUrls}>▷ Save & Start</button>

      {tasks && tasks.length > 0 && (
        <div>
          {tasks.map((task) => (
            <div key={task.task_id} className="task-item">
              <LoadingButton
                size="small"
                onClick={() => handleClick(task.task_id)}
                loading={loading}
                loadingIndicator="Loading…"
                variant="outlined"
              >
                <span>{task?.task_id}</span>
              </LoadingButton>
              <Chip 
                label={task.status === 'Success' ? 'Success' : 'Pending'} 
                color={task.status === 'Success' ? 'success' : 'warning'} 
                variant="outlined" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScraperForm;

