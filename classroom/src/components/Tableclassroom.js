import React from 'react'
const Tableclassroom = (props) => {
  let {data}=props;
  return (
    <tr className='text-center'>
    <td className='border-2 px-4 py-2'>{data.classroomname}</td>
    <td className='border-2 px-4 py-2'>{data._id}</td>
    <td className='border-2 px-4 py-2'>{data.Teacher}</td>

  </tr>
  )
}

export default Tableclassroom
