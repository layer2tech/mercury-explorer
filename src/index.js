import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dataReducer from './store/features/dataSlice';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
      data: dataReducer,
  }
})

// add Provider when store ready

ReactDOM.render(
  <App />
  ,document.getElementById('root'));


