import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import api from "../services/URLService";
import {get} from "axios";

export  const  fetchComapanies  = createAsyncThunk(
   'comanies/fetchComapnies',
   async (companyData) =>{
       try {
           const  response = await api.get('/companies',companyData);
         return response.data ;
       }catch (e) {
           throw e;
       }
   }


);



export  const  addCompanie = createAsyncThunk(
  'companies/addCompany',
async  (companieData ) =>{
      try{
          const   response = await  api.post('companies/addCompany',companieData);
          return response.data;
      }
    catch (e) {
          throw  e;

    }
    }
);



export  const  