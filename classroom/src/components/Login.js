import React from 'react'
import { useContext } from 'react'
import ClassContext from '../context/classcontext';
const Login = () => {
    let context=useContext(ClassContext);
    const {credentials,setCredentials,login}=context;
    const temporarysave=(e)=>{
        e.preventDefault();
        setCredentials({...credentials,[e.target.name]:e.target.value});
        console.log(credentials);
    }
    const HandleSubmit=async (e)=>{
        e.preventDefault();
        login();
       };
  return (
    <>
            <div className='logo  bg-slate-100 rounded-l-lg items-center justify-center flex flex-[0.6] '>
                <img src='https://cdn.prod.website-files.com/5b69a01ba2e409501de055d1/656a0477a887174722e7fa76_Google%20Classroom%20Workspace.png' className='rounded-xl'></img>
            </div>
            <div className='login flex-col flex-[0.4] ml-12 mt-10 bg-slate-100 rounded-r-lg items-center justify-center'>

                <h1 className='text-2xl font-extrabold font-mono text-green-500'>Login to Continue</h1>
                
                <div className='flex flex-col mt-5 '>
                    <form className='flex flex-col mt-5 items-center' onSubmit={HandleSubmit} >
                        <input type='email' name='email'  value={credentials.email} onChange={temporarysave} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Email'/>
                        <input type='password' name='password'  value={credentials.password} onChange={temporarysave} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Password' />
                        <button type='submit' className=' mt-3   border-2 font-semibold w-28 rounded-lg bg-green-500 p-3 text-white'>Login</button>
                    </form>
                </div>

            </div>
            </>

  )
}

export default Login
