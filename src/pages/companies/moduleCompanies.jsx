import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComapanies } from "../../Store/CompanySlice";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import TableCompanies from "../../components/company/tableCompanies";
import { Link } from "react-router-dom";

const ModuleCompanies = () => {

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };

    const dispatch = useDispatch();
    const companiesD = useSelector(state => state.company);
    const companies = companiesD.companies;


    useEffect( () =>  {
        dispatch(fetchComapanies());
    },[dispatch]);


    return (
        <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
            {/* SIDEBAR */}
            <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${sidebar ? "-left-0": "-left-full"} h-full overflow-y-scroll col-span-1 p-8 border-r`}>
                {/* LOGOTIPO */}
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
                </div>
                {/* MENU */}
                <NavBar titulo1={"Dashboard"} ruta1={"/dashboard"} titulo2={"Modules"} ruta2={"#"} titulo3={"Calendar"}
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
                        <h1 className="text-3xl font-bold">Module companies</h1>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full justify-center  border-2 border-transparent transition-all mb-6">
                    <TableCompanies data={companies}/>
                </div>

                <Link to={"/sendRequest"}>Send request for creation company</Link>
            </div>
        </div>
            );
}

export default ModuleCompanies;