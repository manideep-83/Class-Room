import React, {  useState } from 'react';
import ClassContext from './classcontext';
import { useNavigate } from 'react-router-dom';

const ClassState = (props) => {
    const initial={username:"",email:"",password:"",cpassword:""};
    const [credentials,setCredentials]=useState(initial);
    const [loggedindetails,setDetails]=useState(initial);
    let navigate=useNavigate();
    //login api
    const login=async()=>{
        console.log("inside",credentials)
            const response = await fetch(`http://localhost:5000/auth/validateuser/Login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password}),
          });
          const json=await response.json();
          console.log(json);
            if(json.sucess)
            {
              localStorage.setItem('token',json.authToken);
              setCredentials(initial);
              const details=await fetchuser();
              setDetails(details);
              
              localStorage.setItem('details',JSON.stringify(details));
              
              console.log(loggedindetails)
              navigate("/main/dashboard");
            }
            else{
                console.log("wrong details");
            }
    }
    //fetch user
    const fetchuser=async()=>{
        console.log("fetching user",localStorage.getItem('token'));
        const response = await fetch(`http://localhost:5000/auth/Validateuser/fetchuser`, {
            method: "GET",
            headers: {
              "Auth-token": localStorage.getItem('token')
            }
          });
          const json=await response.json();
          console.log("calling",json);
          const persondetails=json.sucess;
          return persondetails;
    }

    const [classroom,setClassroom]=useState([]);
    //Fetch ClassRooms
    const FetchClassRooms=async ()=>{
      const response=await fetch(`http://localhost:5000/auth/class/getClassRooms`,{
        method:"GET"
      });
      const json=await response.json();
      setClassroom(json.rooms); 
    }
    //fetch Available Teachers
    const [teacher,setTeacher]=useState([]);
    const FetchTeachers=async ()=>{
      const response=await fetch(`http://localhost:5000/auth/Validateuser/getAllTeachers`,{
        method:"GET"
      });
      const json=await response.json();
      setTeacher(json.user);
    }
    //fetch Available Students
    const [students,setStudents]=useState([]);
    const FetchStudents=async ()=>{
      const response=await fetch(`http://localhost:5000/auth/Validateuser/getAllStudents`,{
        method:"GET"
      });
      const json=await response.json();
      setStudents(json.user);
    }
    //API TO EDIT DETAILS
    const editDetails=async (det)=>{
      const {name}=det;
      const response=await fetch(`http://localhost:5000/auth/Validateuser/editdetails/${det.id}`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
      });
      const json=await response.json();
      console.log(json);
      FetchTeachers();
      FetchStudents();
      if(json.sucess)
      {
        return "edited Sucessfully";
      }
    }
    //Delete the user
    const deleteuser=async (det)=>{
      const {id}=det;
      const response=await fetch(`http://localhost:5000/auth/Validateuser/delete/${id}`,{
        method:"DELETE"
      });
      const json=await response.json();
      console.log(json.sucess);
      FetchTeachers();
      FetchStudents();
      if(json.sucess)
        {
        return "deleted Sucessfully";
      }
    }
    //sign up 
    const signup=async (details)=>{
      const response = await fetch(`http://localhost:5000/auth/validateuser/AddPerson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:details.username,email: details.email,password: details.password,isTeacher:details.isTeacher,isStudent:details.isStudent,isPrincipal:details.isPrincipal}),
      });
      const json=await response.json();
      console.log("result",json);
      FetchTeachers();
      FetchStudents();
    };
    //get name
    const [namee,setNamee]=useState("");
    const getname=async (id)=>{
      const response=await fetch(`http://localhost:5000/auth/class/getperr/${id}`,{
        method:"GET",
      });
      const json=await response.json();
      if(json.success)
      {
        setNamee(json.person);
      }
      else{
        setNamee("not alloted");
      }

    }
    //Api to add classroom
    const addclassroom=async(classrooom)=>{
      const {name,schedule}=classrooom;
      console.log(name);
      console.log(schedule);
      const response=await fetch(`http://localhost:5000/auth/class/AddClassRoom`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({classroomName:name,schedule:schedule})
      });

      const json=await response.json();
      console.log(json);
      if(json.success)
      {
        return "classRoom created Sucessfully";
      }
      else{
        return "failed";
      }
    }
    //Assign teacher to class
    const assignTeacher=async(classroom,userid)=>{
      console.log("class:",classroom);
      const response=await fetch(`http://localhost:5000/auth/class/AssignTeacher/${classroom._id}`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({teacherid:userid})
      });
      const json=await response.json();
      if(json.success)
      {
        FetchTeachers();
        FetchStudents();
        return "Assigned Teacher Sucessfully";
      }
      else{
        return "Already Assigned a Teacher";
      }


    };
    return (
        <ClassContext.Provider value={{namee,getname,assignTeacher,addclassroom,signup,credentials,setCredentials,login,loggedindetails,deleteuser,FetchClassRooms,classroom,FetchTeachers,teacher,students,FetchStudents,editDetails}}>
            {props.children}
        </ClassContext.Provider>
    );
};

export default ClassState;
