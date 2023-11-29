import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Fetch from './fetchApi';
import NavBar from './NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './dashboard';
import About from './About';
import Contact from './contact';
import Login from './Login';
import AppRoutes from './AppRoutes';
import Register from './Register';

function App() {
  return (
    <div className="container-fluid" style={{height:"100vh"}}>
      {/* <Fetch/> */}
        
      <Register/>
    </div>
  );
}

export default App;
