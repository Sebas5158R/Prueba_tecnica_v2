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
        legal_person: "",
        password: "",
        roles: [
            {
                idRole: "",
                roleType: ""
            }
        ]
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
                legal_person: user.legal_person,
                password: user.password,
                roles: user.roles.map(role => ({
                    idRole: role.idRole,
                    roleType: role.roleType
                }))
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
        dispatch(updateUser({id:user.idUser,userData:formData}));
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
                        <h1 className={`text-3xl font-bold transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Edit User: {user.names + " " + user.lastNames}</h1>
                    </div>
                </div>

                {/* FORM */}
                <div className="max-w-5xl rounded-sm p-5 mx-auto">
                    <form className={`grid grid-cols-2 gap-4 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`} onSubmit={handleSubmit}>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="names" value={formData.names} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="lastNames" className="block text-sm font-medium text-gray-700">Last Names</label>
                            <input type="text" id="lastNames" name="lastNames" value={formData.lastNames} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document Type</label>
                            <select id="documentType" name="documentType" value={formData.documentType} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent">
                                <option value="">Select document type</option>
                                <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Document Number</label>
                            <input type="number" id="documentNumber" name="documentNumber" value={formData.documentNumber} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="number" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="flex items-center ps-4 border-2 border-gray-100 rounded-xl">
                            <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">User with company</label>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="text" id="password" name="password" placeholder="New password" onChange={handleChange} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Roles</label>
                            <input type="text" id="roles" name="roles" value={user.roles.map(role => role.roleType).join(' - ')} onChange={handleChange} readOnly className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" />
                        </div>
                        <div className="col-span-2">
                            <Link to={"/dashboardEmployee"}><button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">Cancel</button></Link>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md float-end">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default EditUser;