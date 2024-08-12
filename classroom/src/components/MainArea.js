import React from 'react'
import Sidebar from './Sidebar'
import Homepage from './Homepage'
import { Route,Routes } from 'react-router-dom'
import AvailableTeachers from './AvailableTeachers'
import AvailableStudents from './AvailableStudents'
import AvailableClassrooms from './AvailableClassrooms'
import AddClassRoom from './AddClassRoom'
import CreateTeachers from './CreateTeachers'
import CreatePersons from './CreatePersons'
import CreateStudents from './CreateStudents'
const MainArea = () => {
  return (
    <>
        <Sidebar/>
        <Routes>
            <Route path='/dashboard' element={<Homepage/>}/>
            <Route path='/AvailableTeachers' element={<AvailableTeachers/>}/>
            <Route path='/AvailableStudents' element={<AvailableStudents/>}/>
            <Route path='/AvailableClassrooms' element={<AvailableClassrooms/>} />
            <Route path='/AddClassRoom' element={<AddClassRoom />}/>
            <Route path='/AddPersons' element={<CreatePersons />}/>
            <Route path='/AddTeacher' element={<CreateTeachers />}/>
            <Route path='/AddStudent' element={<CreateStudents />}/>
        </Routes>
    </>
  )
}

export default MainArea
