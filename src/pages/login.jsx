import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Redux states
    const {loading, error} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredentials = {
            email, password
        }
        dispatch(loginUser(userCredentials)).then((result) => {
            if(result.payload) {
                setEmail('');
                setPassword('');
                navigate('/dashboardEmployee')
            }
        }) 
    }

    return(
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <form onSubmit={handleLoginEvent}>
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <h1 className="text-5xl font-semibold">Welcome Back</h1>
                    <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details.</p>
                    <div className="mt-8">
                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your email"/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your password"/>
                        </div>

                        <div className="mt-8 flex justify-between items-center">
                            <div>
                                <input type="checkbox" id="remember"/>
                                <label htmlFor = "remember" className="ml-2 font-medium text-base">Remember for 30 days</label>
                            </div>
                            <button className="font-medium text-base text-violet-500">Forgot password</button>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="submit" className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white font-lg, font-bold">{loading ? 'Loading...': 'Iniciar sesión'}</button>
                            <button className="flex rounded-xl border-2 py-3 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                                Sign in with Google
                            </button>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center items-center">
                        <p className="font-medium text-base">Don't have an account?</p>
                        <button className="text-violet-500 text-base font-medium ml-2">Sign up</button>
                    </div>
                    </div>
                </form>
            </div>

            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"/>
                <div className="w-full h1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
            </div>
        </div>
    );

}

export default Login;