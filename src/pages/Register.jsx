import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {ImSpinner2} from 'react-icons/im'
import { useRegisterMutation } from '../feature/api/authApi';

const Register = () => {
    const [isLoading,setIsLoaing] = useState(false);
    const {register,handleSubmit} = useForm();

    const [userRegister] = useRegisterMutation();
    const nav = useNavigate();

    const registerHandler = async (user) => {
        setIsLoaing(true);
        const {data} = await userRegister(user);
        setIsLoaing(false);
        if(data?.success){
            nav("/login")
        }
        console.log(data);

    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen ">
                <form onSubmit={handleSubmit(registerHandler)} className="w-96 shadow shadow-violet-300 p-5 rounded-2xl m-2 md:m-2 lg:m-0">
                    <h1 className='text-3xl text-violet-600 font-semibold text-center mb-5'>Create Your Account</h1>
                    <div className="space-y-5">

                        <input {...register("name")} className='border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500' type="text" placeholder='Enter Your UserName' />
                        <input {...register("email")} className='border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500' type="text" placeholder='Enter Your Email' />
                        <input {...register("password")} className='border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500' type="password" placeholder='Password' />
                        <input {...register("password_confirmation")} className='border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500' type="password" placeholder='ConfirmPassword' />
                        <div className="">
                            <button type='submit' className={`bg-violet-700 rounded-3xl p-4 w-full text-white hover:bg-violet-900 transition duration-300 ${isLoading && "btn-disabled"}`}>{
                                isLoading ? <ImSpinner2 className='animate-spin mx-auto h-5 w-5'/> : "Register"
                            }</button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className='text-xs sm:text-xl'>Already have an account?<Link to="/login" className='text-violet-400 ml-1 hover:underline'>Sign in</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register