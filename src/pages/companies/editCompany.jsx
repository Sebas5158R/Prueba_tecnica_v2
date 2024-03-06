import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import Header from "../../components/Header";
import { companyById, updateCompany } from "../../Store/CompanySlice";

const EditCompany = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const company = useSelector((state) => state.company.companyToEdit);
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };

    const [formData, setFormData] = useState({
        nameCompany: "",
        descriptionCompany: "",
        stateCompany: "",
        codeValidation: "",
        user: {
                idUser: ""
            },
        active: "",
        phone: "",
        address: "",
        dateCreation: "",
        dateEndProcess: "",
        documents: ""
    });

    useEffect(() => {
        if(id) {
            dispatch(companyById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if(company) {
            setFormData({
                nameCompany: company.nameCompany,
                descriptionCompany: company.descriptionCompany,
                stateCompany: company.stateCompany,
                codeValidation: company.codeValidation,
                user: {
                    idUser: company.user.idUser
                },
                active: company.active,
                phone: company.phone,
                address: company.address,
                dateCreation: company.dateCreation,
                dateEndProcess: company.dateEndProcess,
                documents: company.pathDocumentation
            })
        }
    }, [company]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateCompany({id:company.idCompany,companyData:formData}));
    }

    if (!company) {
        return <div>Loading...</div>;
    }

    return(
        <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
            {/* SIDEBAR */}
            <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${sidebar ? "-left-0" : "-left-full"} h-full overflow-y-scroll col-span-1 p-8 border-r`}>
                {/* LOGOTIPO */}
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
                </div>
                {/* MENU */}
                <NavBar titulo1={"Dashboard"} ruta1={"/dashboard"} titulo2={"Modules"} ruta2={"/dashboard"} titulo3={"Calendar"}
                    ruta3={"#"} titulo4={"Settings"} ruta4={"/Profile"} />
            </div>
            {/* BTN MENU MOVIL */}
            <button onClick={handleSidebar} className="block lg:hidden fixed bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl z-40">
                {sidebar ? <RiCloseLine /> : <RiMenu3Fill />}
            </button>

            {/* CONTENT */}
            <div className="col-span-5">
                {/* HEADER */}
                <Header />
                {/* CONTENT */}
                <div className="p-4 lg:p-12 bg-gray-100 mb-2">
                    {/* TITLE */}
                    <div>
                        <h1 className={`text-3xl font-bold transition-opacity`}>Edit Company</h1>
                    </div>
                </div>

                <div className="container max-w-screen-lg mx-auto">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Company Details</p>
                                <p>Please correct the information that is wrong.</p>
                            </div>
                                <form onSubmit={handleSubmit} className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="nit">Nit company</label>
                                            <input type="text" name="name" id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={id} onChange={handleChange}
                                                placeholder="10122012334-5" readOnly/>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="name">Name company:</label>
                                            <input type="text" name="nameCompany" value={formData.nameCompany} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="description">Description</label>
                                            <input type="text" name="descriptionCompany" value={formData.descriptionCompany} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="state">State of process</label>
                                            <input type="text" name="stateCompany" value={formData.stateCompany} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="code">Code from validation</label>
                                            <input type="number" name="codeValidation" value={formData.codeValidation} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="user">Id user</label>
                                            <input type="text" name="user" value={formData.user.idUser} onChange={handleChange}  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="active">Active</label>
                                            <input type="checkbox" name="active" value={formData.active} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="phone">Phone company</label>
                                            <input type="number" name="phone" value={formData.phone} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="dateCreation">Date of creation</label>
                                            <input type="text" name="descriptionCompany" value={formData.dateCreation} readOnly className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="dateEndProcess">Date end process</label>
                                            <input type="text" name="dateEndProcess" value={formData.dateEndProcess} readOnly className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="documents">Documents</label>
                                            <input type="text" name="documents" multiple={true} value={formData.documents} readOnly className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <Link to={"/companies"} className="float-start">
                                                <button type="button"
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                            </Link>
                                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
            </div>
                
                </div>
                </div>
    );
}

export default EditCompany;