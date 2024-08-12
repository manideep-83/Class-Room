import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import ClassContext from '../context/classcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddClassRoom = () => {
  let context=useContext(ClassContext);
  const {addclassroom}=context;
  const initialClassroom = { name: "", schedule: [{ startTime: "", endTime: "", day: "" }] };
  const [classroom, setClassroom] = useState(initialClassroom);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroom({ ...classroom, [name]: value });
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedule = [...classroom.schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setClassroom({ ...classroom, schedule: newSchedule });
  };

  const handleAddSchedule = () => {
    setClassroom({
      ...classroom,
      schedule: [...classroom.schedule, { startTime: "", endTime: "", day: "" }]
    });
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = classroom.schedule.filter((_, i) => i !== index);
    setClassroom({ ...classroom, schedule: newSchedule });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Replace this with actual form submission logic
    console.log("Classroom Data:", classroom);
    const msg=await addclassroom(classroom);
    toast.success(msg);
    setClassroom(initialClassroom);
  };

  return (
<>      <ToastContainer position='top-right' />
    <div className='rounded-lg bg-white flex flex-col flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 shadow-custom'>
      <div className='text-center mt-10 font-bold text-xl'>
        Create Classroom
      </div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <form className='flex flex-col mt-5 items-center' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            value={classroom.name}
            className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4'
            placeholder='Enter Classroom Name'
          />
          {classroom.schedule.map((entry, index) => (
            <div key={index} className='flex flex-col mb-3'>
              <div className='flex flex-row items-center'>
                <input
                  type='text'
                  name='startTime'
                  onChange={(e) => handleScheduleChange(index, e)}
                  value={entry.startTime}
                  className='w-28 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4 mr-2'
                  placeholder='Start Time (hh:mm)'
                />
                <input
                  type='text'
                  name='endTime'
                  onChange={(e) => handleScheduleChange(index, e)}
                  value={entry.endTime}
                  className='w-28 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4 mr-2'
                  placeholder='End Time (hh:mm)'
                />
                <input
                  type='text'
                  name='day'
                  onChange={(e) => handleScheduleChange(index, e)}
                  value={entry.day}
                  className='w-28 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4'
                  placeholder='Day'
                />
                <Button
                  type='button'
                  onClick={() => handleRemoveSchedule(index)}
                  className='ml-2'
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type='button'
            onClick={handleAddSchedule}
            className='mb-3'
          >
            Add Schedule
          </Button>
          <button type='submit' className='mt-3 border-2 font-semibold w-28 rounded-lg bg-green-500 p-3 text-white'>
            Create
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddClassRoom;
