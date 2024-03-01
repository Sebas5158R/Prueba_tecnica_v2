import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Store/AuthSlice";

const HeaderCustomer = () => {

    const dispatch = useDispatch();

    const handlerLogout = () => {
        dispatch(logout());
    }

    return(
        <header className="py-6 mb-12 border-b">
            <div className="container mx-auto flex justify-between items-center">
                {/* LOGO */}
                <Link to={"#"} className="flex">
                    <img className="w-3/12" src="logo3.png" alt="Logo" />
                    <h1 className="justify-center flex items-center font-semibold text-blue-400 text-2xl">BS</h1>
                </Link>
                {/* BUTTONS */}
                <div className="flex items-center gap-6">
                    <Link className="hover:text-blue-900 transition hover:underline" to={"/dashboard"}>Home</Link>
                    <Link className="hover:text-blue-900 transition hover:underline" to={"#"}>Settings</Link>
                    <Link className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition" to={"#"} onClick={handlerLogout}>Logout</Link>
                </div>
            </div>
        </header>
    )
}

export default HeaderCustomer;