import React, {useEffect, useState} from "react";
import TableCompany from "../../components/company/tableCompany";
import  {useDispatch,useSelector} from "react-redux";
import {changeIdCompany, fetchComapanies, fetchCompanyById} from "../../Store/CompanySlice";
import SideBar from "../../components/SideBar";
import TableCompanies from "../../components/company/tableCompanies";



const  ModuleCompany =() =>{
   const  dispatch = useDispatch();

   const   companiesD = useSelector(state => state.companies.company());



    console.log(companiesD)
   useEffect( () =>  {
       dispatch(fetchComapanies());
   },[dispatch]);



    const handleEdit =(id)=>{
        dispatch(changeIdCompany(id));
        console.log(`2d ${companiesD.id}`);
    }
   return (
       <div className="flex">
       <SideBar/>
          <div className="ml-4">
             <TableCompanies ></TableCompanies>
          </div>
       </div>
          );
}
export  default  ModuleCompany;