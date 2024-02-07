import React, {useEffect} from "react";
import SideBar from "../../components/SideBar";
import TableCustomers from "../../components/customer/tableCustomers";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../Store/UserSlice";

const ModuleCustomers = () => {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.users_from_db.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return(
        <div className="flex">
            <SideBar/>
            <div className="ml-4">
                <TableCustomers data={customers}/>
            </div>
        </div>
    );
}

export default ModuleCustomers;