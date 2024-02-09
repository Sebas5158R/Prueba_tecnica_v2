import React, {useEffect, useState} from "react";
import  Sidebar from  "../../components/SideBar";
import TableCompany from "../../components/company/tableCompany";
import  {useDispatch,useSelector} from "react-redux";
import {changeIdCompany, fetchComapanies, fetchCompanyById} from "../../Store/companySlice";
import SideBar from "../../components/SideBar";
import  {getElementoPorId} from "./selector";

const  ModuleCompany =() =>{
   const  dispatch = useDispatch();
   const   companiesD = useSelector(state => state.company);
   const companies = companiesD.companies;
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
             <TableCompany data={companies} handleEdit={handleEdit}/>
          </div>
       </div>
          );
}
export  default  ModuleCompany;