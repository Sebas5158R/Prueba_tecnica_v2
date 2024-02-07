import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import TableEmployees from "../../components/employee/tableEmployees";
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers} from "../../Store/UserSlice";
const ModuleEmployees = () => {

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.users_from_db.users);

    useEffect(() => {
      dispatch(fetchUsers());
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