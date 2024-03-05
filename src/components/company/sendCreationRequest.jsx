import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompanie } from "../../Store/CompanySlice";
import Header from "../Header";
import NavBar from "../NavBar";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";

const SendCreationRequest = () => {

    const {loading, error} = useSelector((state) => state.company);

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
    setSidebar(!sidebar);
    };

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

    return(
    <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
        {/* SIDEBAR */}
        <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${sidebar
            ? "-left-0" : "-left-full" } h-full overflow-y-scroll col-span-1 p-8 border-r`}>
            {/* LOGOTIPO */}
            <div className="text-center p-8">
                <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
            </div>
            {/* MENU */}
            <NavBar titulo1={"Dashboard"} ruta1={"/dashboard"} titulo2={"Modules"} ruta2={"#"} titulo3={"Calendar"}
                ruta3={"#"} titulo4={"Settings"} ruta4={"#"} />
        </div>
        {/* BTN MENU MOVIL */}
        <button onClick={handleSidebar}
            className="block lg:hidden fixed bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl z-40">
            {sidebar ?
            <RiCloseLine /> :
            <RiMenu3Fill />}
        </button>

        {/* CONTENT */}
        <div className="col-span-5">
            {/* HEADER */}
            <Header />
            {/* CONTENT */}
            <div className="p-4 lg:p-12 bg-gray-100 mb-10 shadow-2xl">
                {/* TITLE */}
                <div>
                    <h1 className="text-3xl font-bold">Send creation request Form</h1>
                </div>
            </div>

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
                                            placeholder="#" onChange={(e)=> setNit(e.target.value)}/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="name">Name company</label>
                                        <input type="text" name="name" id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name}
                                            onChange={(e)=>
                                        setName(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="desc">Description company</label>
                                        <input type="text" name="description" id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={description}
                                            onChange={(e)=> setDescription(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="user">User</label>
                                        <input type="text" name="user" id="user"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={user}
                                            onChange={(e)=>
                                        setUser(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="documents">Documents</label>
                                        <input type="file" name="documents" id="documents" multiple={true}
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
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={phoneNumber}
                                            onChange={(e)=>
                                        setPhoneNumber(e.target.value)} />
                                    </div>


                                    <div className="md:col-span-5">
                                        <label htmlFor="state">Address</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input name="state" id="state" placeholder="State"
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                value={address} onChange={(e)=> setAddress(e.target.value)}/>
                                            <button tabIndex="-1"
                                                className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18">
                                                    </line>
                                                    <line x1="6" y1="6" x2="18" y2="18">
                                                    </line>
                                                </svg>
                                            </button>
                                            <button tabIndex="-1" htmlFor="show_more"
                                                className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="18 15 12 9 6 15"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            <button type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{loading ? 'Loading...': 'Send request'}</button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            <span className="block sm:inline">{error}</span>
                                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
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
    </div>
    );
    }

export default SendCreationRequest;
