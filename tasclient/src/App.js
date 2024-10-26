import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './page';
import React from 'react';
import Login from './page/login';
// import UploadFile from './component/uploadfile';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
      
        <Route exact path="*" name="Login" element={<Login/>} />  
        <Route path="/home" name="Home"  element={ <Dashboard />} />
      </Routes>
      <div>
  </div>
  </BrowserRouter>
  </>
  );
}

export default App;
