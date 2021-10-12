import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dataReducer from './store/features/dataSlice';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import 'bootstrap/dist/css/bootstrap.min.css';

// Store is the global explorer GUI data structure.
// Non-state data shared between components is stored here.
// State is accessed and modified via reducers, which are defined in /src/features/

const store = configureStore({
  reducer: {
      data: dataReducer,
  }
})

// add Provider when store ready

ReactDOM.render(
  <Provider store = {store}>
      <App />
  </Provider>
  ,document.getElementById('root'));


