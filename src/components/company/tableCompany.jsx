import React ,{useState} from "react";
import  {Link} from "react-router-dom";
import ModalRegisterCustomersForExcel from "../customer/modalRegisterExcel";
import Detailscompany from "./detailscompany";

const TableCompany =({data,handleEdit}) =>{
    const  itemsPerPage=6;
    const  [currentPage,setCurrentpage]= useState(1);
    const indexOfLastItem= currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);
   const [isOpen,setIsOpen]=useState(true);
    const  totalPages = Math.ceil(
        data.length/itemsPerPage
    )

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


        <div className="flex items-center justify-center w-full h-full ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between mb-4 self-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <h1 className="text-2xl font-bold">Companies Management</h1>
                    {/*<ModalRegisterCustomersForExcel/>*/}
                </div>
                {currentItems.length === 0 && (
                    <p className="text-gray-500">No hay datos disponibles.</p>
                )}
                <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            NIT COMPANY
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name Comapany
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description Company
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estate company
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Represent  company
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems
                        .map((company, index) => <tr
                            key={index}
                            className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {company.idCompany}
                            </th>

                            <td className="px-6 py-4">{company.nameCompany}</td>
                            <td className="px-6 py-4">{company.descriptionCompany}</td>
                            <td className="px-6 py-4">{company.stateCompany}</td>
                            <td className="px-6 py-4">{company.user.names}</td>
                            <td className="px-6 py-4 text-right">
                                <Link to={'#'}>
                                    <button onClick={ ()=>handleEdit(company.idCompany)}>
                                         <Detailscompany data={data} idCompany={company.idCompany} />
                                    </button>


                                </Link>
                        </td>
                        </tr>)}
                    </tbody>
                </table>

                <div className="flex justify-end mt-4">
                    <ul className="flex space-x-2">{renderPageNumbers()}</ul>
                </div>
            </div>
        </div>


    );
}
export  default  TableCompany;