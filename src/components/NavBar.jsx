import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardLine, RiBriefcase3Line, RiCalendar2Line, RiChatSettingsFill, RiLogoutBoxRLine } from
"react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../Store/AuthSlice";

const NavBar = ({ titulo1, titulo2, titulo3, titulo4, ruta1, ruta2, ruta3, ruta4 }) => {

    const dispatch = useDispatch();

    const handlerLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="flex flex-col justify-between h-[800px]">
            <nav>
                <ul>
                    <li>
                        <Link to={ruta1}
                            className="flex items-center gap-4 hover:bg-blue-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                        <RiDashboardLine />
                        {/* Dashboard */}
                        {titulo1}
                        </Link>
                    </li>

                    <li>
                        <Link to={ruta2}
                            className="flex items-center gap-4 hover:bg-blue-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                        <RiBriefcase3Line />
                        {/* Modules */}
                        {titulo2}
                        </Link>
                    </li>

                    <li>
                        <Link to={ruta3}
                            className="flex items-center gap-4 hover:bg-blue-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                        <RiCalendar2Line />
                        {/* Calendar */}
                        {titulo3}
                        </Link>
                    </li>

                    <li>
                        <Link to={ruta4}
                            className="flex items-center gap-4 hover:bg-blue-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                        <RiChatSettingsFill />
                        {/* Settings */}
                        {titulo4}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* IMAGE AND LOGOUT */}
            <div className="flex flex-col gap-4">
                <img src="img.svg" alt="imagen" />
                {/* UPDATE */}
                <div className="bg-blue-50 p-8 flex flex-col gap-4 rounded-3xl">
                    <h3 className="text-xl text-center">Get upgrade</h3>
                    <p className="text-gray-500 text-center">Lorem ipsum dolor sit amet consectetur.</p>
                    <button className="bg-green-600 text-white p-2 rounded-lg">
                        <Link to={"#"}>Learn more</Link>
                    </button>
                </div>
                <Link to={"#"} onClick={handlerLogout}
                    className="flex items-center gap-4 hover:bg-blue-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                    <RiLogoutBoxRLine />
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default NavBar;