import React from "react";
import  {Link} from "react-router-dom";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";


const TableCompanies = ({ data }) => {
    
    const currentItems = data.slice();
    let items = document.querySelectorAll('#accordion .item');

    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            items.forEach((header) => {
                header.closest('.item').classList.remove('active');
            });
            e.currentTarget.closest('.item').classList.toggle('active');
        })
    })
    
    return (

        <div id="accordion" className="w-[50%] rounded-md overflow-hidden bg-blue-200 flex flex-col gap-[1px]">
            {currentItems.map((company, index) => (
                <div key={index} className="item">
                    <div className="header p-6 bg-blue-100 font-bold flex justify-between items-center cursor-pointer" onClick={(e) => {
                        let items = document.querySelectorAll('#accordion .item');
                        items.forEach((item) => {
                            if (item !== e.currentTarget.closest('.item')) {
                                item.classList.remove('active');
                            }
                        });
                        e.currentTarget.closest('.item').classList.toggle('active');
                    }}>
                        <div>
                            <div>Name: {company.nameCompany}</div>
                            <div>Nit: {company.idCompany}</div>
                        </div>
                        <RiArrowUpSLine className="text-xl activeIcon"/>
                        <RiArrowDownSLine className="text-xl inactiveIcon"/>
                    </div>
                    <div className="content bg-blue-200 text-xl transition-all duration-500">
                        <div className="flex items-center justify-center w-full h-full ">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Description Company</th>
                                            <th scope="col" className="px-6 py-3">Estate company</th>
                                            <th scope="col" className="px-6 py-3">Represent  company</th>
                                            <th scope="col" className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='bg-white border-b hover:hover:bg-blue-50'>
                                            <td className="px-6 py-4">{company.descriptionCompany}</td>
                                            <td className="px-6 py-4">{company.stateCompany}</td>
                                            <td className="px-6 py-4">{company.user.names}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/editCompany/${company.idCompany}`}>
                                                    Edit
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