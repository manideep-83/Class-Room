import React, { useEffect, useState } from 'react'

const Homepage = () => {
  const [stuco,setStu]=useState(0);
  const [teco,setTe]=useState(0);
  const [classco,setClassco]=useState(0);
  const getco=async()=>{
    const response=await fetch(`http://localhost:5000/auth/class/getcount`,{
      method:"GET"
    });
    const json=await response.json();
    setClassco(json.classes);
    setStu(json.students);
    setTe(json.teachers);
  }
  useEffect(()=>{
    getco();
  },[])
  return (
    <div className=' rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 shadow-custom '>
      <div className='text-center font-bold text-2xl mt-5'>
          <h1>Overview</h1>
      </div>
      <div className='bottom flex flex-row space-x-32 mt-10 ml-16'>
          <div className='teachers border-2 p-10 rounded-lg  shadow-custom'> 
              <h1 className='font-medium'> Available Teachers Count </h1>
              <h1 className='text-center font-bold text-lg mt-2'> {teco}</h1>

          </div>
          <div className='Students border-2 p-10 rounded-lg shadow-custom'> 
            <h1 className='font-medium'>Available Students Count </h1>
            <h1 className='text-center font-bold mt-2 text-lg'> {stuco}</h1>
          </div>
          <div className='Classrooms border-2 p-10 rounded-lg  shadow-custom'> 
            <h1 className='font-medium'>Available Classrooms Count</h1>
            <h1 className='text-center font-bold mt-2 text-lg'> {classco}</h1>
          </div>
      </div>
    </div>
  )
}

export default Homepage
