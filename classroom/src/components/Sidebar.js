import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import ClassContext from '../context/classcontext'
const Sidebar = () => {
  let context=useContext(ClassContext);
  const {loggedindetails}=context;
  const storedDetails = JSON.parse(localStorage.getItem('details'));
  const HandleLogout=()=>{
    localStorage.clear();
  };
  console.log("loggedin",loggedindetails)
  return (
    <div className='rounded-lg flex flex-col flex-[0.15] m-3 p-5 bg-white shadow-custom'>
      <div className='text-center mt-5 mb-7'>
        <h1 className='font-bold text-xl'>welcome {storedDetails.name}</h1>
      </div>
      <div className='bottom flex flex-col'>
        
        <NavLink to="/main/dashboard">
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-5 hover:bg-slate-200 rounded-lg'>
          <h1>DashBoard</h1>
        </div>
        </NavLink>
        
        <NavLink to="/main/AvailableClassrooms">
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3  hover:bg-slate-200 rounded-lg'>  
          <h1>Available Classrooms</h1>
        </div>
        </NavLink>
        
        {storedDetails.isPrincipal || storedDetails.isTeacher ? (
              <NavLink to="/main/AvailableTeachers">
                  <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3 hover:bg-slate-200 rounded-lg'>
                      <h1>Available Teachers</h1>
                  </div>
              </NavLink>
          ) : null}
        <NavLink to="/main/AvailableStudents">
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3  hover:bg-slate-200 rounded-lg'>
          <h1>Available Students</h1>
        </div>
        </NavLink>
        {storedDetails.isPrincipal?(<NavLink to="/main/AddClassRoom">
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3  hover:bg-slate-200 rounded-lg'>
          <h1>Add classRoom</h1>
        </div>
        </NavLink>):null}
        {storedDetails.isPrincipal?(<NavLink to="/main/AddPersons">
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3  hover:bg-slate-200 rounded-lg'>
          <h1>Add users</h1>
        </div>
        </NavLink>):null}
        <NavLink to="/" onClick={HandleLogout}>
        <div className='flex border-b-2 p-3 border-b-black-100 font-mono text-lg mt-3  hover:bg-slate-200 rounded-lg'>
          <h1>Logout</h1>
        </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
