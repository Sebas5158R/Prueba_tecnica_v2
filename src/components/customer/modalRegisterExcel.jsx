import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addCustomersForExcel} from "../../Store/UserSlice";

const ModalRegisterCustomersForExcel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [fileSize, setFileSize] = useState(null);
    const [excelFile, setExcelFile] = useState(null);

    const dispatch = useDispatch();

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


    return (
        <div>

            <button onClick={() => setIsOpen(true)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Register clients from excel file
            </button>
            {
                isOpen && (
                    <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-2xl">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Register clients from Excel file
                                    </h3>
                                    <button onClick={() => setIsOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-purple-200 hover:text-purple-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                                        Upload file
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                        aria-describedby="file_input_help"
                                        id="file_input"
                                        type="file"
                                        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        onChange={handleFileChange}
                                        required={true}
                                    />
                                    {fileSize && (
                                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                                            File size: {fileSize}
                                        </p>
                                    )}
                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            <svg
                                                className="me-1 -ms-1 w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default ModalRegisterCustomersForExcel;