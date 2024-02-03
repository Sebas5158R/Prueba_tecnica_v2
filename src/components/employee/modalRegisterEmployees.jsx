import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../Store/EmployeeSlice";

const ModalRegisterEmployees = () => {

    const [names, setNames] = useState("");
    const [lastNames, setLastNames] = useState("");
    const [email, setEmail] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [idRole, setIdRole] = useState(null);

    const dispatch = useDispatch()

    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newEmployee = {
            names,
            lastNames,
            email,
            documentType,
            documentNumber,
            phoneNumber,
            password,
            roles: [
                {
                    idRole
                }
            ]
        };

        console.log(newEmployee);
        dispatch(addEmployee(newEmployee));

        setNames("");
        setLastNames("");
        setEmail("");
        setDocumentType("");
        setDocumentNumber("");
        setPhoneNumber("");
        setPassword("");
        setIdRole("");

        window.alert("Empleado registrado exitosamente");

        window.location.reload();
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const handleRoleSelection = (roleId) => {
        setIdRole(roleId);
        nextStep();
    }

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
                                                strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">Select which role the new
                                        employee will be :</p>
                                    <ul className="space-y-4 mb-4">
                                        <li>
                                            <input type="radio" id="role-1" name="roles"
                                                className="hidden peer"
                                                onChange={() => handleRoleSelection(1)}
                                                required />
                                            <label htmlFor="role-1"
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
                                                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="role-2" name="roles"
                                                className="hidden peer"
                                                onChange={() => handleRoleSelection(2)}
                                                required />
                                            <label htmlFor="role-2"
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
                                                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="role-3" name="roles"
                                                className="hidden peer"
                                                onChange={() => handleRoleSelection(3)}
                                                required />
                                            <label htmlFor="role-3"
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
                                                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                {step === 2 && isOpen && (
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
                                                strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Names</label>
                                                <input type="text" value={names} onChange={(e) => setNames(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="John" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="lastNames"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                                    names</label>
                                                <input type="text" value={lastNames} onChange={(e) => setLastNames(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Doe" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="johnDoe@example.com" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="documentType"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document
                                                    type</label>
                                                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}
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
                                                <input type="number" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="104354343" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="phoneNumber"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                                                    number</label>
                                                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="31409092890" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <input type="number" value={idRole} onChange={(e) => setIdRole(e.target.value)} readOnly={true}
                                                    className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                            </div>

                                        </div>
                                        <button type={"submit"}
                                            className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Save
                                        </button>
                                    </form>
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