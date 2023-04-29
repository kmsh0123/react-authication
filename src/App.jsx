import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Guard from './pages/Guard';


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Guard><Dashboard/></Guard>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </>
  )
}

export default App