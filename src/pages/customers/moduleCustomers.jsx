import React from "react";
import SideBar from "../../components/SideBar";
import ModalRegisterCustomersForExcel from "../../components/customer/modalRegisterExcel";

const ModuleCustomers = () => {
    return(
        <div className="flex">
            <SideBar/>
            <div className="ml-4">
                <h1>Welcome</h1>
                <ModalRegisterCustomersForExcel/>
            </div>
        </div>
    );
}

export default ModuleCustomers;