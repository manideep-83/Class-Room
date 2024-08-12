import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClassContext from '../context/classcontext';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Tableclassroom = (props) => {
  let context=useContext(ClassContext);
  const {getname,namee}=context;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let {data}=props;
  // useEffect(()=>{
  //   getname(data.Teacher);
  // },[data.Teacher]);
  return (
    <tr className='text-center'>
    <td className='border-2 px-4 py-2'>{data.classroomname}</td>
    <td className='border-2 px-4 py-2'>{data._id}</td>
    <td className='border-2 px-4 py-2'>{data.Teacher}</td>

  </tr>
  )
}

export default Tableclassroom
