import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SideBar = () => {

    const [open, setOpen] = useState(true);
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.replace('/');
      };
    
    const Menus = [
        { title: "Dashboard", path: "/dashboardEmployee" },
        {
            title: "Modules",
            icon: <FontAwesomeIcon icon="fa-solid fa-table" />,
            submenu: true,
            submenuItems: [
                { title: "Employees", path: "/employees" },
                { title: "Customers", path: "/customers" },
                { title: "Companies" }
            ],
        },
        { title: "Inbox", icon: <FontAwesomeIcon icon="fa-solid fa-inbox" /> },
        { title: "Settings", spacing: true, icon: <FontAwesomeIcon icon="fa-solid fa-gear" /> },
        { title: "Logout", icon: <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}/>},

    ];

    return (
        <div className="flex">
          <div className={`bg-blue-950 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left"
              className={`bg-white text-purple-900 text-3xl rounded-l-full absolute -right-3 top-9 border border-purple-950 cursor-pointer ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="inline-flex">
            <FontAwesomeIcon icon="fa-solid fa-circle-user"
                className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2  duration-500 ${open && "rotate-[360deg]"}`}
              />
              <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>User</h1>
            </div>
    
            <div className={`flex items-center rounded-md bg-gray-600 mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"
                className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`}
              />
              <input
                type="search"
                placeholder="Search"
                className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}
              />
            </div>
    
            <ul className="pt-2">
              {Menus.map((menu, index) => (
                <React.Fragment key={index}>
                <li
                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                    } mt-2`}
                >
                    <span className="text-2xl block float-left">
                    {menu.icon ? menu.icon :  <FontAwesomeIcon icon="fa-solid fa-house" />}
                    </span>
                    <Link to={menu.path}>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                    </Link>
                    {menu.submenu && open && (
                      <FontAwesomeIcon icon="fa-solid fa-chevron-down"
                        className={`ml-20 ${subMenuOpen && "rotate-180"}`}
                        onClick={() => setSubMenuOpen(!subMenuOpen)}
                      />
                    )}
                    
                  </li>
    
                  {menu.submenu && subMenuOpen && open && (
                    <ul>
                      {menu.submenuItems.map((submenuItem, subIndex) => (
                        <li key={`${index}-${subIndex}`} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-600 rounded-md">
                          <Link to={submenuItem.path}>{submenuItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
    )
}

export default SideBar;