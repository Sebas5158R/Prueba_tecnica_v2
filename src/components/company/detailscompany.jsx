import React, {useEffect, useState} from "react";
import  {Link} from "react-router-dom";
import ModalRegisterCustomersForExcel from "../customer/modalRegisterExcel";
import {useDispatch} from "react-redux";
import {addCustomersForExcel} from "../../Store/UserSlice";
const Modaleditcompany =({data,idCompany}) =>{

    console.log(data[0]);

    const  itemsPerPage=6;
    const  [currentPage,setCurrentpage]= useState(1);
    const indexOfLastItem= currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);
    const [isOpen,setIsOpen]=useState(false);
    const  closeModal=async (isOpen) =>{
        if (isOpen === true ){
            return setIsOpen(false)
        }
        else if (isOpen === false){
          return   setIsOpen(true)
        }

    }

    const [nameCompany, setNames] = useState("");
    const [descriptionCompany, setDescriptionCompany] = useState("");
    const [idUser, setIdUser] = useState("");
    const [documents, setDocuments] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const company = {
        nameCompany: "",
        descriptionCompany: "",
        idUser: "",
        documents: "",
        phone: "",
        address: ""
    }

    const dispatch = useDispatch();

    dispatch()


    const  totalPages = Math.ceil(
        data.length/itemsPerPage
    )
    const dispatch = useDispatch();
    const renderPageNumbers =() =>{
        const  pageNumbers=[];
        for (let i = 1; i<= totalPages;i++){
            pageNumbers.push(
                <li
                    key={i}
                    className={`mx-1 p-2 cursor-pointer ${i === currentPage ?'bg-blue-500  text-white':'bg-gray-200'}`}
                    onClick={()=>setCurrentpage(i)}
                >
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };
    return (



        <div>

            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" onClick={() => closeModal(isOpen)}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                Edit
            </button>

            {

                isOpen && (
                    <div >
                        {currentItems .filter((company) => (company.idCompany===idCompany)).map((company,index) => <div>


                        <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                             className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 w-full max-w-md max-h-full">

                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                    <div
                                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Create New Product
                                        </h3>
                                        <button type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                data-modal-toggle="crud-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                 fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap={"round"} strokeLinejoin={"round"}
                                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <form className="p-4 md:p-5" onSubmit={}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id
                                                    company</label>
                                                <input type="text" name="name"
                                                       value={idCompany}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Type product name" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
                                                    company</label>
                                                <input type="text" name="name"
                                                       defaultValue={company.nameCompany}
                                                       onChange={(e) => setNames(e.target.value)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Type name company" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <input type="text" name="name"
                                                       defaultValue={company.descriptionCompany}
                                                       onChange={(e) => setDescriptionCompany(e.target.value)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Type description company" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id
                                                    user company</label>
                                                <input type="text" name="name" id="name"
                                                       defaultValue={company.user.idUser}
                                                       onChange={(e) => setIdUser(e.target.value)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Id user company" required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documents</label>
                                                <input type="file" name="name" id="name"
                                                       defaultValue={company.documents}
                                                       onChange={(e) => setDocuments(e.target.value)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       required=""/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="phone"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                                <input id="description" defaultValue={company.phone} onChange={(e) => setPhone(e.target.value)}
                                                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       placeholder="Write product description here"/>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="name"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id
                                                    user company</label>
                                                <input type="text" name="name" id="name"
                                                       defaultValue={company.address}
                                                       onChange={(e) => setAddress(e.target.value)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                       placeholder="Id user company" required=""/>
                                            </div>
                                        </div>
                                        <button type="submit"
                                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule={"evenodd"}
                                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        </div>)}
                    </div>
                )
            }
        </div>

    );
}
export default Modaleditcompany;