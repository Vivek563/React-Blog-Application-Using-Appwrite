import {useDispatch } from 'react-redux'
import { useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useEffect } from 'react';
import {login, logout } from './store/authSlice'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])




  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:  <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
