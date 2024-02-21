import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterUser = () => {

    const MultiStepForm = () => {
        const [step, setStep] = useState(1);

        const nextStep = () => {
            setStep(prevStep => prevStep + 1);
          };

          const prevStep = () => {
            setStep(prevStep => prevStep - 1);
          };

          switch(step) {
            case 1:
                return(
                    <div>
                        <div>
                            <label className="text-lg font-medium">Names</label>
                            <input type="text" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your names" required={true}/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Last names</label>
                            <input type="text" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your last names" required={true}/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input type="text" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your email" required={true}/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Document type</label>
                            <select className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" required={true}>
                                <option value="#">Select document type</option>
                                <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        </div>

                        <div className="mt-8 flex flex-col gap-y-4">
                        <button onClick={nextStep} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white font-lg, font-bold">Siguiente</button>
                        <Link to={"/"} className="flex rounded-xl border-2 py-3 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all hover:bg-red-400">
                            <button>Cancel</button>
                        </Link>
                        </div>
                    </div>
                );

                case 2:
                    return(
                        <div>
                            <div>
                            <label className="text-lg font-medium">Document number</label>
                            <input type="number" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your document number" required={true}/>
                        </div>

                        <div>
                            <label className="text-lg font-medium">Phone number</label>
                            <input type="number" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your phone number" required={true}/>
                        </div>
                        
                        <div>
                            <label className="text-lg font-medium">Password</label>
                            <input type="password" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your password" required={true}/>
                        </div>

                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="submit" className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white font-lg, font-bold">Registrarme</button>
                            <button className="flex rounded-xl border-2 py-3 border-gray-100 items-center text-white font-lg bg-pink-400 font-bold justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all hover:bg-pink-500" onClick={prevStep}>Anterior</button>
                            <Link to={"/"} className="flex rounded-xl border-2 py-3 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all hover:bg-red-400">
                            <button className="">Cancel</button>
                            </Link>
                        </div>
                        </div>
                    );
                default:
                    return null;
          }
    }

    return(
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <form>
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <h1 className="text-5xl font-semibold">Welcome</h1>
                    <p className="font-medium text-lg text-gray-500 mt-4">Welcome, please create an account to use our system.</p>
                    <div className="mt-8">
                        <MultiStepForm/>  
                    </div>
                    </div>
                </form>
            </div>

            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
                <div className="w-full h1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
            </div>
        </div>
    );
}

export default RegisterUser;