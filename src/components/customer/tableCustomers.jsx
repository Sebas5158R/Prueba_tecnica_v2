import React, {useState} from "react";
import {Link} from "react-router-dom";
import ModalRegisterCustomersForExcel from "./modalRegisterExcel";
import ModalRegisterCustomers from "./modalRegisterCustomers";

const TableCustomers = ({ data }) => {

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={`mx-1 p-2 cursor-pointer ${i === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(i)}
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
                        <h1 className="text-2xl font-bold">Customers Management</h1>
                        <div className="flex gap-5">
                        <ModalRegisterCustomers/>
                        <ModalRegisterCustomersForExcel/>
                        </div>
                    </div>
                    {currentItems.length === 0 && (
                        <p className="text-gray-500">No hay datos disponibles.</p>
                    )}
                    <table
                        className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Names
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last names
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Document type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Document number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Legal person
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems
                            .filter((customer) => [4].includes(customer.roles[0].idRole))
                            .map((customer, index) => (
                                <tr
                                    key={index}
                                    className={'bg-white border-b hover:bg-blue-50'}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {customer.names}
                                    </th>
                                    <td className="px-6 py-4">{customer.lastNames}</td>
                                    <td className="px-6 py-4">{customer.email}</td>
                                    <td className="px-6 py-4">{customer.documentType}</td>
                                    <td className="px-6 py-4">{customer.documentNumber}</td>
                                    <td className="px-6 py-4">{customer.phoneNumber}</td>
                                    <td className="px-6 py-4">{customer.legal_person}</td>
                                    {customer.roles.length > 0 ? (
                                        <td className="px-6 py-4">
                                            {customer.roles.map((role, index) => (
                                                <div key={index}>{role.roleType}</div>
                                            ))}
                                        </td>
                                    ) : (
                                        <td className="px-6 py-4">No roles available</td>
                                    )}
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/editUser/${customer.idUser}`}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-4">
                        <ul className="flex space-x-2">{renderPageNumbers()}</ul>
                    </div>
                </div>
            </div>

    );
}

export default TableCustomers;