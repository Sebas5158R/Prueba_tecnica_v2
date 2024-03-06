import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCompanie } from "../../Store/CompanySlice";
import { jwtDecode } from "jwt-decode";
import HeaderCustomer from "../HeaderCustomers";

const SendCreationRequest = () => {

    const {loading, error} = useSelector((state) => state.company);
    const [userRole, setUserRole] = useState('');

    const [nit, setNit] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [documents, setDocuments] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [fileSize, setFileSize] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("idCompany", nit);
    formData.append("name_company", name);
    formData.append("description_company", description);
    formData.append("user", user);
    formData.append("documents", documents);
    formData.append("phone", phoneNumber);
    formData.append("address", address);
    formData.append("documents", documents);

    dispatch(addCompanie(formData));

    setNit("");
    setName("");
    setDescription("");
    setUser("");
    setDocuments("");
    setPhoneNumber("");
    setAddress("");
    setDocuments(null);
    };


    const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);

    if (file) {
    const sizeInKB = file.size / 1024;
    setFileSize(sizeInKB.toFixed(2) + " KB");
    } else {
    setFileSize(null);
    }

    setDocuments(file);
    };

    useEffect(() => {
    const token = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles;
    const rolesString = roles.toString();
    const rolesArray = rolesString.replace(/[[\]]/g, '');
    let rolesSplit = rolesArray.split(',');
    setUserRole(rolesSplit);
    }, [setUserRole])

    return(
    <div>
        { (userRole.includes('CLIENTE')) && (
        <div>
            <HeaderCustomer />
            <div className="container max-w-screen-lg mx-auto">

                <div>
                    <p className="text-gray-500 mb-6">In order to create your company you must send an application.</p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Company Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="lg:col-span-2" encType="multipart/form-data">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="nit">Nit company</label>
                                        <input type="text" name="name" id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={nit}
                                            placeholder="10122012334-5" onChange={(e)=> setNit(e.target.value)} required/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="name">Name company</label>
                                        <input type="text" name="name" id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name}
                                            placeholder="Creative business name ideas"
                                            onChange={(e)=>
                                        setName(e.target.value)} required/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="desc">Description company</label>
                                        <input type="text" name="description" id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={description}
                                            placeholder="An overview of the company's plan, vision, and relationships"
                                            onChange={(e)=> setDescription(e.target.value)} required/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="user">User</label>
                                        <input type="text" name="user" id="user"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={user}
                                            onChange={(e)=>
                                        setUser(e.target.value)} required/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="documents">Documents</label>
                                        <input type="file" name="documents" id="documents" multiple={true} required
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                            onChange={handleFileChange} />
                                        {fileSize && (
                                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                                            File size: {fileSize}
                                        </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="user">Number phone</label>
                                        <input type="number" name="phone" id="phone"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={phoneNumber} placeholder="1-800-777-7777"
                                            onChange={(e)=>
                                        setPhoneNumber(e.target.value)} required />
                                    </div>


                                    <div className="md:col-span-5">
                                        <label htmlFor="state">Address</label>
                                        <div
                                            className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input name="state" id="state" placeholder="6191 S. State Street, Suite 200"
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                value={address} onChange={(e)=> setAddress(e.target.value)} required/>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <Link to={"/companies"} className="float-start">
                                            <button type="button"
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                        </Link>
                                        <div className="inline-flex items-end">
                                            <button type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{loading
                                                ? 'Loading...': 'Send request'}</button>
                                        </div>
                                    </div>

                                    {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                        role="alert">
                                        <span className="block sm:inline">{error}</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <svg className="fill-current h-6 w-6 text-red-500" role="button"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <title>Close</title>
                                                <path
                                                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                            </svg>
                                        </span>
                                    </div>
                                    )}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
    );
    }

export default SendCreationRequest;
