import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/UserSlice";

const ModalRegisterCustomers = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [names, setNames] = useState("");
    const [lastNames, setLastNames] = useState("");
    const [email, setEmail] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [idRole, setIdRole] = useState(4);

    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCustomer = {
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

        console.log(newCustomer);
        dispatch(addUser(newCustomer));

        setNames("");
        setLastNames("");
        setEmail("");
        setDocumentType("");
        setDocumentNumber("");
        setPhoneNumber("");
        setPassword("");
        setIdRole("");
    };

    return(
        <div>

            <button onClick={() => setIsOpen(true)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Register client
            </button>

            {
                isOpen && (
                    <div tabIndex="-1" aria-hidden="true"
                        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow">
                                <div
                                    className="flex items-center justify-between p-4 md:p-5 border-b border-blue-300 rounded-t">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Register a new Employee
                                    </h3>
                                    <button onClick={() => setIsOpen(false)} type="button"
                                        className="text-gray-400 bg-transparent hover:bg-blue-200 hover:text-blue-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
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
                                                    className="block mb-2 text-sm font-medium text-gray-900">Names</label>
                                                <input type="text" value={names} onChange={(e) => setNames(e.target.value)}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                        placeholder="John" required={true} />

                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="lastNames"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Last
                                                    names</label>
                                                <input type="text" value={lastNames} onChange={(e) => setLastNames(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                    placeholder="Doe" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                    placeholder="johnDoe@example.com" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="documentType"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Document
                                                    type</label>
                                                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5" required={true}>
                                                    <option value="">Select document type</option>
                                                    <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                                    <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                                    <option value="Pasaporte">Pasaporte</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="documentNumber"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Document
                                                    number</label>
                                                <input type="number" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                    placeholder="104354343" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="phoneNumber"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Phone
                                                    number</label>
                                                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                    placeholder="31409092890" required={true} />
                                            </div>

                                            <div className="col-span-2">
                                            <label htmlFor="phoneNumber"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                                                    placeholder="Password" required={true}
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <input type="number" value={idRole} onChange={(e) => setIdRole(e.target.value)} readOnly={true}
                                                    className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5" />
                                            </div>

                                        </div>
                                        <button type={"submit"}
                                            className="text-white inline-flex w-full justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default ModalRegisterCustomers