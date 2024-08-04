
import axios from "axios";


const createDagPayload = {
    'dag_id': 'amitpagespeed',
    'schedule': '0 0 * * *',
    'start_date': '2024-08-03'
}
//   schedule_options = {
//     'Daily at midnight (IST)': '0 0 * * *',
//     'Daily at 6 AM (IST)': '0 6 * * *',
//     'Daily at 12 PM (IST)': '0 12 * * *',
//     'Weekly on Mondays at midnight (IST)': '0 0 * * 1',
//     'Hourly': '0 * * * *'
// }

export const createDag = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/create_dag_file', data);

    //   response = {
    //     "message": "DAG file created and Airflow reloaded",
    //     "dag_file_path": "C:/Users/Saptarshi/Documents/kie_tools/docker/dags\\amitpagespeedinsights.py",
    //     "refresh_output": {
    //     }
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

export const modifyDag = async (data) => {
    try {
      const response = await axios.post('https://b02c-202-78-234-201.ngrok-free.app/modify-file/', data);

    //   response = {
    //     "message": "DAG file created and Airflow reloaded",
    //     "dag_file_path": "C:/Users/Saptarshi/Documents/kie_tools/docker/dags\\amitpagespeedinsights.py",
    //     "refresh_output": {
    //     }
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


  export const createDagWithScript = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/create_dag', data);

    //   response = {
    //     "message": "DAG file created and Airflow reloaded",
    //     "dag_file_path": "C:/Users/Saptarshi/Documents/kie_tools/docker/dags\\amitpagespeedinsights.py",
    //     "refresh_output": {
    //     }
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





  const unpauseDagPayload = {
    'dag_id': 'amitpagespeed',

  }

  export const unpauseDag = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/unpause_dag', data);

    //   response = {
    //     "message": "DAG amitpagespeedinsights unpaused",
    //     "output": {
    //         "error": " Container docker-redis-1  Running\n Container docker-postgres-1  Running\n Container docker-airflow-init-1  Created\n Container docker-redis-1  Waiting\n Container docker-postgres-1  Waiting\n Container docker-postgres-1  Healthy\n Container docker-redis-1  Healthy\n Container docker-airflow-init-1  Starting\n Container docker-airflow-init-1  Started\nDAG: amitpagespeedinsights does not exist in 'dag' table\n"
    //     }
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

  const pauseDagPayload = {
    'dag_id': 'amitpagespeed',

  }

  export const pauseDag = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/pause_dag', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };

  export const listAllDags = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/list_dags', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };

  const triggerDagPayload = 
    {'dag_id': 's3sjtabletest'}
  
  export const triggerDag = async (data) => {
    try {
      const response = await axios.post('https://767e-202-78-234-201.ngrok-free.app/trigger_dag', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };


