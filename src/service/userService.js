// src/services/authService.js

// const scrapeUrl = 'https://ad53-223-233-86-60.ngrok-free.app/scrape';

// scrapePayload = {
//   "brand_handles": ["Nike"],
//   "start_date": "2024-05-18",
//   "end_date": "2024-07-25",
//   "scraping_type": "Tweet"
// }
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/login', {
      email,
      password
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const {data: {userId}} = response.data;
    localStorage.setItem('userInfo', JSON.stringify(userId));

    return userId;
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
};


export const getUserActivity = async (id, tab_name) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/users/get-user-activity', {
      id,
      tab_name
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getting activity:', error);
    throw error;
  }
};

export const getUserAndPaymentInfo = async (id) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/get-user-info', {
      userId:id
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};

export const getDBAndSchemaTableCreationStatus = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users/get-db-schema-status/${id}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};
export const updateDBCreationStatus = async (data) => {
  try {
    const response = await axios.put('http://localhost:8080/api/v1/users/update-db-status',
      {data}
    );

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};
export const updateSchemaTableCreationStatus = async (data) => {
  try {
    const response = await axios.put('http://localhost:8080/api/v1/users/update-schema-table-status',
      {data}
    );

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};

export const startScrapping = async (data) => {
  try {
    const response = await axios.post('https://5cbe-2409-40c2-19-4246-355e-b917-7970-4c37.ngrok-free.app/scrape', data);
    
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};

export const getScrappingStatus = async (id) => {
  try {
    const response = await axios.get(`https://5cbe-2409-40c2-19-4246-355e-b917-7970-4c37.ngrok-free.app/status/${id}`);
    
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getting user info:', error);
    throw error;
  }
};

