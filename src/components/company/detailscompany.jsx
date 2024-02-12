import React, {useEffect, useState} from "react";
import  {Link} from "react-router-dom";
import ModalRegisterCustomersForExcel from "../customer/modalRegisterExcel";
import {useDispatch} from "react-redux";
import {addCustomersForExcel} from "../../Store/UserSlice";
const Detailscompany =({data,handleEdit,idCompany}) =>{
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
            <button onClick={() =>closeModal(isOpen) } data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">

                Details compani
            </button>
            {
                isOpen && (

                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                                {currentItems
                                    .filter((company) => (company.idCompany === idCompany))
                                    .map((company, index) => <tr
                                        key={index}
                                         >
                                        <tr
                                            scope="row"
                                            className=""
                                        >
                                            {company.idCompany}
                                        </tr>
                                        <tr className="">{company.nameCompany}</tr>
                                        <tr className="">{company.descriptionCompany}</tr>
                                        <tr className="">{company.stateCompany}</tr>
                                        <tr className="">{company.user.names}</tr>
                                        <tr className="">
                                            <Link to={'#'}>
                                                <button  onClick={() => handleEdit(company.idCompany)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                    Edit
                                                </button>
                                            </Link>
                                        </tr>
                                    </tr>)}

                            </div>

                    </div>

         )
            }
        </div>

    );
}
export default Detailscompany;