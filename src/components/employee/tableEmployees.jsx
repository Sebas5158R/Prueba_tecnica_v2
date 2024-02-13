import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalRegisterEmployees from "./modalRegisterEmployees";

const TableEmployees = ({ data }) => {

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
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <ModalRegisterEmployees />
        </div>
        {currentItems.length === 0 && (
          <p className="text-gray-500">No hay datos disponibles.</p>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems
              .filter((employee) => [1, 2, 3].includes(employee.roles[0].idRole))
              .map((employee, index) => (
                <tr
                  key={index}
                  className={'bg-white border-b hover:bg-purple-50'}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {employee.names}
                  </th>
                  <td className="px-6 py-4">{employee.lastNames}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.documentType}</td>
                  <td className="px-6 py-4">{employee.documentNumber}</td>
                  <td className="px-6 py-4">{employee.phoneNumber}</td>
                  {employee.roles.length > 0 ? (
                    <td className="px-6 py-4">
                      {employee.roles.map((role, index) => (
                        <div key={index}>{role.roleType}</div>
                      ))}
                    </td>
                  ) : (
                    <td className="px-6 py-4">No roles available</td>
                  )}

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/editUser/${employee.idUser}`}
                      className="font-medium text-purple-600 hover:underline"
                    >
                      Editar
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

};

export default TableEmployees;
