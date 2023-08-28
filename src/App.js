
import './App.css';
import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './model/Login';
import User from './model/User';
import Header from './home_nav/Header';
import EventUpload from './model/EventUpload';
import EditEventUpload from './model/EditEventUpload';
import DataTableUsers from './model/DataTableUsers';
import ForgotPasswordOtp from './forgotpassowrd/ForgotPasswordOtp';
import OtpAssign from './forgotpassowrd/OtpAssign';
import Profile from './home_nav/Profile';
import ChangePassword from './forgotpassowrd/ChangePassword';
import VideoUpload from './model/VideoUpload/VideoUpload';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<User/>}/>
        <Route path='/headersnav' element={<Header/>}/>
        <Route path='/eventupload' element={<EventUpload/>}/>
        <Route path='/eventupdate' element={<EditEventUpload/>}/>
        <Route path='/datatable' element={<DataTableUsers/>}/> 
        <Route path='/otpsend' element={<ForgotPasswordOtp/>}/> 
        <Route path='/otpAssign' element={<OtpAssign/>}/> 
        <Route path='/profile' element={<Profile/>}/> 
        <Route path='/changePassword' element={<ChangePassword/>}/> 
        <Route path='/videoupload' element={<VideoUpload/>}/> 
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
