import React, { useEffect, useState } from "react";
import  {Link} from "react-router-dom";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import {useDispatch} from "react-redux";
import {changeState} from "../../Store/CompanySlice";
const TableCompanies = ({ data }) => {

     const  dispatch  = useDispatch();
    const currentItems = data.slice();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        let items = document.querySelectorAll('#accordion .item');
    
        items.forEach((item) => {
            item.addEventListener('click', (e) => {
                items.forEach((header) => {
                    header.closest('.item').classList.remove('active');
                });
                e.currentTarget.closest('.item').classList.toggle('active');
            })
        })
        if (!items) {
            return <div>Loading...</div>;
        }
    }, []);

    
 const  handleMark = (idCompany)=>{
  dispatch(changeState(idCompany))
 }
    
    
    return (

        <div id="accordion" className="w-full rounded-md overflow-hidde flex flex-col gap-[1px]">
            {currentItems.map((company, index) => (
                <div key={index} className={`item ${activeIndex === index ? 'active' : ''}`}>
                    <div className="header p-6 bg-gray-300 font-bold flex justify-between items-center relative z-10 overflow-visible cursor-pointer"
                    onClick={() => {setActiveIndex(activeIndex === index ? null : index)}}>
                        <div>
                            <div>Name: {company.nameCompany}</div>
                            <div>Nit: {company.idCompany}</div>
                        </div>
                        <RiArrowUpSLine className="text-xl activeIcon"/>
                        <RiArrowDownSLine className="text-xl inactiveIcon"/>
                    </div>
                    <div className="content bg-gray-100 text-xl transition-all duration-500">
                        <div className="flex items-center justify-center w-full h-full ">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-auto text-sm text-left rtl:text-right text-gray-500 table-auto">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Represent  company</th>
                                            <th scope="col" className="px-6 py-3">Description Company</th>
                                            <th scope="col" className="px-6 py-3">Estate company</th>
                                            <th scope="col" className="px-6 py-3">Address</th>
                                            <th scope="col" className="px-6 py-3">Date creation</th>
                                            <th scope="col" className="px-6 py-3">State</th>
                                            <th scope="col" className="px-6 py-3">Document</th>
                                            <th scope="col" className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='bg-white border-b hover:hover:bg-blue-50'>
                                        <td className="px-6 py-4">{company.user.names} {company.user.lastNames}</td>
                                            <td className="px-6 py-4">{company.descriptionCompany}</td>
                                            <td className="px-6 py-4">{company.stateCompany}</td>
                                            <td className="px-6 py-4">{company.address}</td>
                                            <td className="px-6 py-4">{company.dateCreation}</td>

                                           <td className={"px-6 py-4"}>
                                               {
                                                company.stateCompany==="pending" ?(
                                            <div>
                                               <button type={"submit"} onClick={() => handleMark(company.idCompany)}  className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"} > ¿Mark Reviewed? </button>
                                            </div>
                                            ) : (
                                                <div>
                                                    <button   className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"} > {company.stateCompany}  </button>
                                                </div>
                                            )
                                               }
                                           </td>
                                            <td className="px-6 py-4">
                                                <Link to={`http://localhost:8090/company/files?pathPdf=${company.pathDocumentation}`} target="_blank" rel="noopener noreferrer">
                                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>Open</button>
                                                </Link>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/editCompany/${company.idCompany}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Edit</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
}

export default TableCompanies;