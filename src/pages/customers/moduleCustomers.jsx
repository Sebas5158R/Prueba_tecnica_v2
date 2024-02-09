import React, {useEffect, useState} from "react";
import SideBar from "../../components/SideBar";
import TableCustomers from "../../components/customer/tableCustomers";
import {useDispatch, useSelector} from "react-redux";
import {addCustomersForExcel, fetchUsers} from "../../Store/UserSlice";

const ModuleCustomers = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [fileSize, setFileSize] = useState(null);
    const [excelFile, setExcelFile] = useState(null);

    useEffect(() => {
        console.log("Current excelFile:", excelFile);
    }, [excelFile]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", excelFile);
        dispatch(addCustomersForExcel(formData));

        setExcelFile("");

        setIsOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected File:", file);

        if (file) {
            const sizeInKB = file.size / 1024;
            setFileSize(sizeInKB.toFixed(2) + " KB");
        } else {
            setFileSize(null);
        }

        setExcelFile(file);
    };


    const dispatch = useDispatch();
    const customers = useSelector(state => state.users_from_db.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (

        <div>
            <button onClick={() => setIsOpen(true)} data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                    show details
            </button>

            {
                isOpen && (
                    <div className="flex">
                        <SideBar/>
                        <div className="ml-4">
                            <TableCustomers data={customers}/>
                        </div>
                    </div>
                )
            }

        </div>

    )
        ;
}

export default ModuleCustomers;