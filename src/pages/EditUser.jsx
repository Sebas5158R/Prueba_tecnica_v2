import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, userById } from "../Store/UserSlice";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";

const EditUser = () => {

    const { id } = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users_from_db.userToEdit);
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };

    const [formData, setFormData] = useState({
        names: "",
        lastNames: "",
        email: "",
        documentType: "",
        documentNumber: "",
        phoneNumber: "",
        legal_person: ""
    });

    // Verificar si el usuario está disponible antes de renderizar
    useEffect(() => {
        if (id) {
            dispatch(userById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                names: user.names,
                lastNames: user.lastNames,
                email: user.email,
                documentType: user.documentType,
                documentNumber: user.documentNumber,
                phoneNumber: user.phoneNumber,
                legal_person: user.legal_person
            });
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(user.idUser, formData));
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 350);
        return () => clearTimeout(timeout);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
            {/* SIDEBAR */}
            <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${sidebar ? "-left-0" : "-left-full"} h-full overflow-y-scroll col-span-1 p-8 border-r`}>
                {/* LOGOTIPO */}
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
                </div>
                {/* MENU */}
                <NavBar titulo1={"Dashboard"} ruta1={"/dashboardEmployee"} titulo2={"Modules"} ruta2={"/dashboardEmployee"} titulo3={"Calendar"}
                    ruta3={"#"} titulo4={"Settings"} ruta4={"#"} />
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
                <div className="p-4 lg:p-12 bg-gray-100 mb-10">
                    {/* TITLE */}
                    <div>
                        <h1 className={`text-3xl font-bold text-center transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Edit User: {user.names + " " + user.lastNames}</h1>
                    </div>
                </div>

                {/* FORM */}
                <div className="max-w-lg mx-auto">
                    <form className={`grid grid-cols-2 gap-4 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`} onSubmit={handleSubmit}>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" value={user.names} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="lastNames" className="block text-sm font-medium text-gray-700">Last Names</label>
                            <input type="text" id="lastNames" value={user.lastNames} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={user.email} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document Type</label>
                            <select id="documentType" value={user.documentType} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <option value="">Select document type</option>
                                <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Document Number</label>
                            <input type="number" id="documentNumber" value={user.documentNumber} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="number" id="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Legal Person</label>
                            <input type="text" id="phoneNumber" value={user.legal_person} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Roles</label>
                            <input type="text" id="roles" value={user.roles.map(role => role.roleType).join(', ')} readOnly className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2">
                            <Link to={"/dashboardEmployee"}><button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">Cancel</button></Link>
                            <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md float-end">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default EditUser;