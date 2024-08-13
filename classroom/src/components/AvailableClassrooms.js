import React, { useContext, useEffect } from 'react'
import Tableclassroom from './Tableclassroom'
import ClassContext from '../context/classcontext'
const AvailableClassrooms = () => {
  const context=useContext(ClassContext);
  const {FetchClassRooms,classroom}=context;
  //console.log("classrooms",classroom);
  useEffect(()=>{
  FetchClassRooms();
  },[FetchClassRooms])
  //console.log(classroom);
  return (
    <div className=' rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 shadow-custom  '>
      <h1 className='text-center font-bold text-xl mt-7 mb-7'>Available Classrooms</h1>
      <div className='flex items-center justify-center mt-7'>
        <table className='table-auto w-[50vw]'>
          <thead className='border-2'>
            <tr>
              <th className='border-2 px-4 py-2'>Classroom Name</th>
              <th className='border-2 px-4 py-2'>Classroom ID</th>
              <th className='border-2 px-4 py-2'>Alloted Teacher Unique id</th>
              
            </tr>
          </thead>
          <tbody className='border-2'>
            {classroom.map((val)=>{
              return <Tableclassroom data={val} />
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AvailableClassrooms
