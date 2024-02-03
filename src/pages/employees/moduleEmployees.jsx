import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import TableEmployees from "../../components/employee/tableEmployees";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../Store/EmployeeSlice";
const ModuleEmployees = () => {

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.users);

    useEffect(() => {
      dispatch(fetchEmployees());
    }, [dispatch]);

    return(
        <div className="flex">
            <SideBar/>
            <div className="ml-4">
                <TableEmployees data={employees} />
            </div>
        </div>
    );
}

export default ModuleEmployees;