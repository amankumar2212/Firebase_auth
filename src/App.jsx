import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import User from './User'
import { ToastContainer } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
