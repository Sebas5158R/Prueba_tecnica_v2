import React ,{useState} from "react";
import  {Link} from "react-router-dom";
import ModalRegisterCustomersForExcel from "../customer/modalRegisterExcel";
import Detailscompany from "./detailscompany";
import Modaleditcompany from "./detailscompany";

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

                    {currentItems
                        .map((company, index) => <tr
                            key={index}

                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {company.idCompany}
                            </th>

                            <div id="accordion-collapse" data-accordion="collapse">
                                <h2 id="accordion-collapse-heading-1">
                                    <button type="button"
                                            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                            data-accordion-target="#accordion-collapse-body-1" aria-expanded="true"
                                            aria-controls="accordion-collapse-body-1">
                                        <span>{company.nameCompany}</span>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-1" className="hidden"
                                     aria-labelledby="accordion-collapse-heading-1">
                                    <div
                                        className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="">{company.nameCompany}</p>
                                        <p className="">{company.descriptionCompany}</p>
                                        <p className="">{company.stateCompany}</p>
                                        <tp className="">{company.user.names}</tp>
                                        <Modaleditcompany data={data} idCompany={1}></Modaleditcompany>
                                    </div>
                                </div>
                            </div>


                            <td className="px-6 py-4 text-right">
                                <Link to={'#'}>
                                    <button onClick={() => handleEdit(company.idCompany)}>

                                        <Modaleditcompany data={data} idCompany={company.idCompany} />

                                    </button>
                                </Link>
                            </td>
                        </tr>)}




                <div className="flex justify-end mt-4">
                    <ul className="flex space-x-2">{renderPageNumbers()}</ul>
                </div>
            </div>
        </div>


    );
}
export default TableCompany;