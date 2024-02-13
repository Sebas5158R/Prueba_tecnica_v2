import React, {useEffect, useState} from "react";
import TableCustomers from "../../components/customer/tableCustomers";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../Store/UserSlice";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

const ModuleCustomers = () => {

    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };

    const dispatch = useDispatch();
    const customers = useSelector(state => state.users_from_db.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

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
                        <h1 className="text-3xl font-bold">Module customers</h1>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full  border-2 border-transparent transition-all mb-6">
                    <TableCustomers data={customers}/>
                </div>
            </div>
        </div>
    );
}

export default ModuleCustomers;