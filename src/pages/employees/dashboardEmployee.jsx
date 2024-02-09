import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { RiCloseLine, RiMenu3Fill, RiTeamLine, RiContactsFill, RiCommunityFill } from "react-icons/ri";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const DashboardEmployee = () => {

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };


    return(
        <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
            {/* SIDEBAR */}
            <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${sidebar ? "-left-0": "-left-full"} h-full overflow-y-scroll col-span-1 p-8 border-r`}>
                {/* LOGOTIPO */}
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
                </div>
                {/* MENU */}
                <NavBar titulo1={"Dashboard"} ruta1={"/dashboardEmployee"} titulo2={"Modules"} ruta2={"#"} titulo3={"Calendar"}
                    ruta3={"#"} titulo4={"Settings"} ruta4={"#"} />
            </div>
            {/* BTN MENU MOVIL */}
            <button onClick={handleSidebar} className="block lg:hidden fixed bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl z-40">
                {sidebar ? <RiCloseLine/> : <RiMenu3Fill/>}
            </button>
            {/* CONTENT */}
            <div className="col-span-5">
                {/* HEADER */}
                <Header/>
                {/* CONTENT */}
                <div className="p-4 lg:p-12 bg-gray-100 mb-10 shadow-2xl">
                    {/* TITLE */}
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                    </div>
                </div>
                {/* CARDS */}
                <Link to={"/employees"} className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-6">
                    {/* ICON */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <RiTeamLine className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
                    </div>
                    {/* TITLE */}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center gap-4 mb-2">
                            Employees <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">Super admin</span>
                            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold">Admin</span> 
                        </h1>
                        <p className="text-gray-500">Check everything related to employees</p>
                    </div>
                    {/* BTN */}
                    <div className="w-full md:w-[20%] flex flex-col justify-end items-end">
                        <button className="bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full">Go to module</button>
                    </div>
                </Link>

                <Link to={"/customers"} className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-6">
                    {/* ICON */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <RiContactsFill className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
                    </div>
                    {/* TITLE */}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center gap-4 mb-2">
                            Customers <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">Super admin</span>
                            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold">Admin</span> 
                        </h1>
                        <p className="text-gray-500">Check everything related to customers</p>
                    </div>
                    {/* BTN */}
                    <div className="w-full md:w-[20%] flex flex-col justify-end items-end">
                        <button className="bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full">Go to module</button>
                    </div>
                </Link>

                <Link to={"#"} className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-6">
                    {/* ICON */}
                    <div className="w-full md:w-[10%] flex items-center justify-start md:justify-center">
                        <RiCommunityFill className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
                    </div>
                    {/* TITLE */}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center gap-4 mb-2">
                            Companies <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">Super admin</span>
                            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold">Admin</span>
                            <span className="text-xs py-1 px-2 bg-yellow-100 text-yellow-600 font-bold">Customers</span> 
                        </h1>
                        <p className="text-gray-500">Check everything related to companies</p>
                    </div>
                    {/* BTN */}
                    <div className="w-full md:w-[20%] flex flex-col justify-end items-end">
                        <button className="bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full">Go to module</button>
                    </div>
                </Link>
            </div>
        </div>
);
}

export default DashboardEmployee;
