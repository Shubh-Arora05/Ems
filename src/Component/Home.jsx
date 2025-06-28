import React, { useContext } from 'react'
// import {ThemeContext} from '../Context/AppContext'


import { Link } from "react-router";

const Home = () => {
  // const  {theme, settheme} = useContext('ThemeContext') ;
  return (
    <div className='flex pages w-screen h-screen justify-center items-center p-5'>

    <div className=' p-12 flex-col'>

        <h1 className = 'lg:text-6xl md:text-2xl text-2xl text-center font-bold text-blue-200' >Employee Management System</h1>

        <div className = ' flex flex-col gap-24 p-24 justify-center items-center ' >



        <div className='text-center flex flex-col gap-4 font-semibold  text-white'>
        <p className='text-xl'>You are Admin, Click here</p>
         <Link to = '/adminlogin' className='text-2xl text-blue-500'>Admin</Link>
         </div>

         <div className='text-center flex flex-col gap-4 font-semibold  text-white'>
        <p className='text-xl'> You are Employee, Click here</p>
         <Link to = '/employeelogin' className='text-2xl text-blue-500'>Employee</Link>
         </div>

        </div>

    </div>
    
    </div>
  )
}

export default Home