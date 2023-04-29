import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {AiOutlineUser,AiOutlineGoogle} from "react-icons/ai"
import {BsKeyFill,BsFacebook} from "react-icons/bs"
import {BiUserCircle} from "react-icons/bi"
import {ImSpinner2} from "react-icons/im"
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../feature/api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../feature/service/authSlice'

const Login = () => {
  const [isLoading,setIsLoaing] = useState(false);
  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const nav = useNavigate();

  const loginHandler = async (user) => {
    setIsLoaing(true);
    const {data} = await login(user);
    dispatch(addUser({user:data?.user,token:data?.token}))
    if(data?.success){
      nav("/")
    }
    setIsLoaing(false);
    console.log(data);
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit(loginHandler)} className="shadow shadow-violet-300 p-5 rounded-2xl relative m-1 sm:m-2 lg:m-0 w-96">
        <BiUserCircle className='text-6xl mx-auto'/>
            <div className="">
            <AiOutlineUser className='w-5 h-5 absolute top-[133px] right-[30px]'/>
            <label htmlFor="email" className='text-xl font-semibold ml-1'>Email Address</label>
            <input {...register("email")} id='email' className='outline-0 shadow-2xl mb-5 mt-2 border rounded-lg p-4 w-full text-violet-500' type="text" placeholder='Example@email.com' />
            <BsKeyFill className='w-5 h-5 absolute top-[248px] right-[30px]'/>
            <label htmlFor="password" className='text-xl font-semibold ml-1 mt-9'>Password</label>
            <input {...register("password")}id="password" className='outline-0 shadow-2xl mb-5 mt-2 border rounded-lg p-4 w-full text-violet-500' type="password" placeholder='Enter your password' />
            <button className={`bg-violet-700 rounded-3xl p-5 w-full text-white hover:bg-violet-900 transition duration-300 my-2 ${isLoading && "btn-disabled"}`}>{
              isLoading ? <ImSpinner2 className='animate-spin mx-auto w-5 h-5'/> : "Login"
            }</button>
            </div>
            <div className="flex justify-between items-center my-2">
                <p className='text-[14px]'>Don't have an account?<Link to="/register" className='text-violet-400 ml-1 hover:underline'>Sign Up</Link></p>
                <Link to="#" className='text-violet-500 text-[14px] hover:underline'>Forgot Password</Link>
            </div>
            <div className="flex gap-2 mt-5">
            <button className='border border-violet-500 hover:bg-violet-500 hover:text-white transition duration-300 p-2 px-4 flex items-center justify-center w-1/2 rounded-xl'> <AiOutlineGoogle className='text-4xl mr-1'/><span>Google</span></button>
            <button type="submit" className='border border-violet-500 hover:bg-violet-500 hover:text-white transition duration-300 p-2 px-4 flex items-center justify-center w-1/2 rounded-xl'><BsFacebook className='text-3xl mr-2'/><span>Facebook</span></button>
            </div>
        </form>
    </div> 
    </>
  )
}

export default Login