import React, { useState } from "react";
import LoginService from "../services/LoginService";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = await LoginService(email, password);
            localStorage.setItem("Token", token);
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
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
                        <button onClick={handleLogin} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white font-lg, font-bold">Sign in</button>
                        <button className="flex rounded-xl border-2 py-3 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                            Sign in with Google
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an account?</p>
                    <button className="text-violet-500 text-base font-medium ml-2">Sign up</button>
                </div>
                </div>
            </div>

            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"/>
                <div className="w-full h1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
            </div>
        </div>
    );

}

export default Login;