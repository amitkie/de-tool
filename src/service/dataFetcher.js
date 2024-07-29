import axios from "axios";

// // src/services/authService.js
// export const createDB = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/v1/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       return await response.json();
//     } catch (error) {
//       console.error('Error in login:', error);
//       throw error;
//     }
//   };

  

  export const createDB = async (data) => {
    try {
      const response = await axios.post('https://46ff-2409-40e0-1059-5b10-bde7-19cb-d334-9f46.ngrok-free.app/rds_login/', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };
  export const createSchema = async (data) => {
    try {
      // const response = await axios.post('https://4429-202-78-234-201.ngrok-free.app/rds_login/', data);
      const response = await axios.post('https://46ff-2409-40e0-1059-5b10-bde7-19cb-d334-9f46.ngrok-free.app/table-creation/', data);
  
  //     {
  //   // "message": "Migration completed successfully"
  // }
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };
  
  export const createTable = async (data) => {
    try {
      const response = await axios.post('https://3372-202-78-234-201.ngrok-free.app/table-creation/', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };