import React from 'react'
import { NavLink } from 'react-router-dom'
const CreatePersons = () => {
  return (
    <div className='rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 shadow-custom items-center justify-center'>
      <h1 className='font-bold text-lg'>Add Teacher or Students to the classRoom</h1>
      <div className='flex flex-row'>
        <NavLink to="/main/AddTeacher">
        <button type='submit' className=' mt-8   border-2 border-green-500 font-semibold  rounded-lg bg-green-500 p-3 text-white'>Add Teacher</button>
        </NavLink>
        <NavLink to="/main/AddStudent">
        <button type='submit' className=' mt-8 ml-14  border-2 font-semibold border-green-500  rounded-lg bg-green-500 p-3 text-white'>Add Student</button>
        </NavLink>
      </div>
      
    </div>
  )
}

export default CreatePersons
