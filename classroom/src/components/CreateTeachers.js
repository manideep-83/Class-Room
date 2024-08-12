import React, { useContext, useState } from 'react'
import ClassContext from '../context/classcontext'
import { ToastContainer,toast } from 'react-toastify'
const CreateTeachers = () => {
    const credential={
        username:"",
        email:"",
        password:"",
        cpassword:"",
        isTeacher:true,
        isStudent:false,
        isPrincipal:false
    }
    let context=useContext(ClassContext);
    const {signup}=context;
    const [credentials,setCredentials]=useState(credential);
    const temporarysave=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if(credentials.password!==credentials.cpassword)
        {
            toast.error("Password does not match with confirm password")
            setCredentials({
                ...credentials,
                password: "",  // Clear the password field
                cpassword: ""  // Optionally clear the confirm password field
            });
        }
        else{
            signup(credentials);
            toast.success("Teacher Added Sucessfully");
            setCredentials(credential);
        }
//        console.log(credentials);

    }
    


  return (

    <div className='rounded-lg bg-slate-100 flex flex-row items-center justify-center flex-[0.85] h-[80vh] w-[80vw] m-3 p-3 pl-0 shadow-custom '>
            <div className='login flex-col flex-[0.4] p-7   bg-slate-100 rounded-lg items-center justify-center shadow-custom'>
                <h1 className='text-2xl font-extrabold font-mono text-green-500'>Add Teacher</h1>
                <div className='flex flex-col mt-5 '>
                    <form className='flex flex-col mt-5 items-center' onSubmit={HandleSubmit}>
                        <input type='text' name='username' onChange={temporarysave} value={credentials.username} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Username' />
                        <input type='email' name='email' onChange={temporarysave} value={credentials.email} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Email' />
                        <input type='password' name='password' onChange={temporarysave} value={credentials.password} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Password' />
                        <input type='password' name='cpassword' onChange={temporarysave} value={credentials.cpassword} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='confirm Password' />
                        <button type='submit' className=' mt-3   border-2 font-semibold w-28 rounded-lg bg-green-500 p-3 text-white'>Signup</button>
                    </form>
                    <ToastContainer position='top-right'/>
                </div>
            </div>
    </div>
    
  )
}

export default CreateTeachers
