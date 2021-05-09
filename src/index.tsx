import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:8080/api/member";
//axios.defaults.headers.common['Authorization']= "Bearer " + localStorage.getItem("token")


ReactDOM.render(

    <App />
 ,
  document.getElementById('root')
);

reportWebVitals();
