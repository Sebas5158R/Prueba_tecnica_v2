import NavBar from "../../components/NavBar";
import {RiCloseLine, RiMenu3Fill, RiNotification2Line} from "react-icons/ri";
import Header from "../../components/Header";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TableCompanies from "../../components/company/tableCompanies";
import {fetchComapanies} from "../../Store/CompanySlice";

const  ResponseCompany =()=>{

    const dispatch = useDispatch();
    const company = useSelector(state => state.company.companies)
    const companyForResponse = company.filter(compania => compania.stateCompany==="Reviewed");
    const  notify = companyForResponse.length
    console.log(companyForResponse)

    useEffect( () =>  {
        dispatch(fetchComapanies());
    },[dispatch]);
    const  handleModuleCompanies = () =>{
        window.location.replace("/companies")

    }

    const  handlereview = ()=>{
        window.location.replace('/reviewCompany')
    }


    return (
        <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
            {/* SIDEBAR */}
            <div
                className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all  h-full overflow-y-scroll col-span-1 p-8 border-r`}>
                {/* LOGOTIPO */}
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]">Logo</h1>
                </div>
                {/* MENU */}
                <NavBar titulo1={"Dashboard"} ruta1={"/dashboard"} titulo2={"Modules"} ruta2={"/dashboard"}
                        titulo3={"Calendar"}
                        ruta3={"#"} titulo4={"Settings"} ruta4={"/Profile"}/>
            </div>
            {/* BTN MENU MOVIL */}
            <button
                className="block lg:hidden fixed bottom-4 right-4 bg-blue-600 p-2 text-white rounded-full text-2xl z-40">
                <RiCloseLine/>
            </button>

            {/* CONTENT */}
            <div className="col-span-5">
                {/* HEADER */}
                <Header/>
                {/* CONTENT */}
                <div className="p-4 lg:p-12 bg-gray-100 mb-2">
                    {/* TITLE */}
                    <div>
                        <h1 className={`text-3xl font-bold transition-opacity`}>Request Company</h1>
                    </div>
                </div>

                <div className="float-end mr-6 flex flex-row">
                    <button
                        className={"flex gap-2.5 items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}
                        onClick={handleModuleCompanies}>
                 Module Company
                    </button>

                    <button
                        className={"flex gap-2.5 items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}
                        onClick={handlereview}>
                        Review Company
                    </button>




                    <button
                        className={"flex gap-2.5 items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}>
                        creation authorization

                        <div className="flex">
                            <RiNotification2Line className="text-xl"/>
                            <p className="flex align-bottom">{notify} </p>
                        </div>

                    </button>
                </div>
                <div
                    className="rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full justify-center  border-2 border-transparent transition-all mb-6">
                    <TableCompanies data={companyForResponse}/>
                </div>

            </div>
        </div>
    )


}
export default ResponseCompany;