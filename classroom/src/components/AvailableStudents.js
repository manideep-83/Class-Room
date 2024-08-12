import React, { useContext, useEffect } from 'react'
import TableTeacher from './TableTeacher'
import ClassContext from '../context/classcontext'

const AvailableStudents = () => {
  let context=useContext(ClassContext);
  const {students,FetchStudents}=context;
  useEffect(()=>{
    FetchStudents()
  },[])
  const storedDetails = JSON.parse(localStorage.getItem('details'));
  return (
    <div className=' rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 shadow-custom '>
      <h1 className='text-center font-bold text-xl mt-7 mb-7'>Available Students</h1>
      <div className='flex items-center justify-center mt-7'>
        <table className='table-auto w-[50vw]'>
          <thead className='border-2'>
            <tr>
              <th className='border-2 px-4 py-2'>Student Unique Id</th>
              <th className='border-2 px-4 py-2'>Student Name</th>
              {storedDetails.isPrincipal?(<th className='border-2 px-4 py-2'>Edit</th>):null}
              {storedDetails.isPrincipal?(<th className='border-2 px-4 py-2'>Delete</th>):null}
              <th className='border-2 px-4 py-2'>Assign</th>
            </tr>
          </thead>
          <tbody className='border-2'>
           {students.map((val)=>{
              return <TableTeacher data={val} />
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AvailableStudents
