import React from "react";
import SideBar from "../../components/SideBar";
import { Link } from "react-router-dom";

const DashboardEmployee = () => {

    return(
        <div className="flex h-screen">
            <SideBar />
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-3xl mb-6">WELCOME</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    
                    <div className="max-w-md bg-white rounded-md overflow-hidden shadow-lg">
                        <img className="w-full h-32 object-cover" src="https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fteam-meeting3.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=415&q=88&w=622&s=74224701576ca2f473993d6a30a43cac" alt="img employees" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Employees</div>
                            <p className="text-gray-700 text-base">
                                Information and details about employees.
                            </p>
                            <Link to={"/employees"}>
                                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-purple-900">Go to module</button>
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-md bg-white rounded-md overflow-hidden shadow-lg">
                    <img className="w-full h-32 object-cover" src="https://www.marketingdonut.co.uk/sites/default/files/why-it-pays-profile-your-customers_40367974.jpg" alt="img customers" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Customers</div>
                            <p className="text-gray-700 text-base">
                                Information and details about customers.
                            </p>
                            <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-purple-900">Go to module</button>
                        </div>
                    </div>

                    <div className="max-w-md bg-white rounded-md overflow-hidden shadow-lg">
                    <img className="w-full h-32 object-cover" src="https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs=" alt="img company" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Companies</div>
                            <p className="text-gray-700 text-base">
                                Information and details about companies.
                            </p>
                            <Link to={"/companies"}>
                                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-purple-900">Go to module</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardEmployee;