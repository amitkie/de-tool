// src/App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import router from "./routes/routes";
import './App.css';
import DynamicAlert from './components/DynamicAlert/DynamicAlert';

const App = () => {
  return (
    <Provider store={store}>
        <DynamicAlert/>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
