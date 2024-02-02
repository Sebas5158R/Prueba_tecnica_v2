import React, {useState} from "react";

const ModalRegisterEmployees = () => {

    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const nextStep = () => {
        setStep(step + 1);
    };

    return (
        <div>

            <button onClick={() => setIsOpen(true)} data-modal-target="select-modal" data-modal-toggle="select-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                Add Employee
            </button>

            {
                isOpen && step === 1 && (
                    <div tabIndex="-1" aria-hidden="true"
                         className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div
                                    className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Register a new Employee
                                    </h3>
                                    <button onClick={() => setIsOpen(false)} type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-toggle="select-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">Select which role the new
                                        employee will be :</p>
                                    <ul className="space-y-4 mb-4">
                                        <li>
                                            <input type="radio" id="job-1" name="job" value="job-1"
                                                   className="hidden peer"
                                                   required/>
                                            <label htmlFor="job-1"
                                                   className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">SUPER ADMINISTRADOR
                                                    </div>
                                                    <div className="w-full text-gray-500 dark:text-gray-400">Full access
                                                        to system
                                                    </div>
                                                </div>
                                                <svg
                                                    className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="job-2" name="job" value="job-2"
                                                   className="hidden peer"/>
                                            <label htmlFor="job-2"
                                                   className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">ADMINISTRADOR</div>
                                                    <div className="w-full text-gray-500 dark:text-gray-400">Full access
                                                        to modules
                                                    </div>
                                                </div>
                                                <svg
                                                    className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="job-3" name="job" value="job-3"
                                                   className="hidden peer"/>
                                            <label htmlFor="job-3"
                                                   className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">USER REGULAR</div>
                                                    <div className="w-full text-gray-500 dark:text-gray-400">Access only
                                                        to modules that are put on it
                                                    </div>
                                                </div>
                                                <svg
                                                    className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </label>
                                        </li>
                                    </ul>
                                    <div>
                                        <button onClick={nextStep}
                                                className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Next step
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                { step === 2 && isOpen && (
                    <div tabIndex="-1" aria-hidden="true"
                         className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div
                                    className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Register a new Employee
                                    </h3>
                                    <button onClick={() => setIsOpen(false)} type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-toggle="select-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form className="p-4 md:p-5">
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Names</label>
                                                <input type="text" name="names" id="names"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="John" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="lastNames"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                                    names</label>
                                                <input type="text" name="lastNames" id="lastNames"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Doe" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="email"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="johnDoe@example.com" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="documentType"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document
                                                    type</label>
                                                <select id="documentType"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="">Select document type</option>
                                                    <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                                    <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                                    <option value="Pasaporte">Pasaporte</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="documentNumber"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document
                                                    number</label>
                                                <input type="number" name="documentNumber" id="documentNumber"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="104354343" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <input type="text" name="password" id="password"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       value={"password1"} readOnly={true}/>
                                            </div>

                                            <div className="col-span-2">
                                                <input type="number" name="idRole" id="idRole"
                                                       className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       required=""/>
                                            </div>

                                        </div>
                                    </form>
                                    <div>
                                        <button onClick={nextStep} type={"submit"}
                                                className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalRegisterEmployees;