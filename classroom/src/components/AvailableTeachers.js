import React, { useContext, useEffect } from 'react'
import TableTeacher from './TableTeacher'
import ClassContext from '../context/classcontext'

const AvailableTeachers = () => {
  const storedDetails = JSON.parse(localStorage.getItem('details'));
  let context=useContext(ClassContext);
  const {teacher,FetchTeachers}=context;
  useEffect(()=>{
    FetchTeachers();
  },[FetchTeachers]);
  console.log("Teacher",teacher);

  return (
    <div className=' rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3  shadow-custom'>
      <h1 className='text-center font-bold text-xl mt-7 mb-7'>Available Teachers</h1>
      <div className='flex items-center justify-center mt-7'>
        <table className='table-auto w-[50vw]'>
          <thead className='border-2'>
            <tr>
              <th className='border-2 px-4 py-2'>Teacher Unique Id</th>
              <th className='border-2 px-4 py-2'>Teacher Name</th>
              {storedDetails.isPrincipal?(<th className='border-2 px-4 py-2'>Edit</th>):null}
              {storedDetails.isPrincipal?(<th className='border-2 px-4 py-2'>Delete</th>):null}
              <th className='border-2 px-4 py-2'>Assign</th>
            </tr>
          </thead>
          <tbody className='border-2'>
            {teacher.map((val)=>{
              return <TableTeacher data={val} />
            })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AvailableTeachers
