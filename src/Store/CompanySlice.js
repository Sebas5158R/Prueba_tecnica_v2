import {createAsyncThunk,createSlice,createAction,} from "@reduxjs/toolkit";
import api from "../services/URLService";
import {get} from "axios";

export  const  fetchComapanies  = createAsyncThunk(
   'companies/fetchCompanies',
   async (companyData) =>{
       try {
           const  response = await api.get('/company/companies',companyData);
         return response.data ;
       }catch (e) {
           throw e;
       }
   }
);



export  const  addCompanie = createAsyncThunk(
  'companies/addCompany',
async  (companyData ) =>{
      try{
          const   response = await  api.post('companies/addCompany',companyData);
          return response.data;
         }
    catch (e) {
          throw  e;
        }
    }
);



export  const  createCompany = createAsyncThunk(
    'companies/createCompany',
    async (companyData ) =>{
        try {
            const  response = await  api.post('companies/createCompany',companyData);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const  editCompany = createAsyncThunk(
    'companies/editCompany' ,
    async ({idCompany,companyData})=>{
    try {
        console.log(
            "aquitoyyyyy")
        console.log(companyData)
        console.log(idCompany)
        const  response = await  api.put(`/company/updateCompany/${idCompany}`,companyData)
        console.log(companyData+"data")
        return response.data
    }catch (e) {
        throw e;
    }

}


)


export  const  fetchCompanyById = createAsyncThunk(
    'companies/fetchCompanyBy' ,
    async  (companyData) =>{
        try {
            const  response = await  api.get('companies/createCompani/{'+companyData.idCompany+'}')
            return response.data
        } catch (e) {
            throw  e;
        }
    }





);




export const changeIdCompany = createAction('companies/changeIdCompany');

const  companySlice = createSlice({
    name : "companies",
    initialState:{
        id:null,
        companyId:null,
        companies:[],
        error : null

    },
    reducers: {
        // Add the action handler to the reducers property
        changeIdCompany: (state, action) => {
            state.id = action.payload;
            state.error = null;
        },
        // ... other reducers
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchComapanies.fulfilled,(state,action)=>{
                state.companies = action.payload;
                state.error = null ;
                }

            ).addCase(fetchComapanies.rejected,(state,action) =>{
                state.companies=[];
                console.log(action.error.message);
                if (action.error.message === 'Request failed with status code 500'){
                    state.error='Access Denied';
                }else{
                  state.error = action.error.message
                }
        })
            .addCase(addCompanie.fulfilled,(state,action) => {
                state.companies = action.payload ;
                state.companies=null;
            } )
            .addCase(addCompanie.rejected,(state,action
                ) =>{
                 state.companies = action.payload;
                 state.error = null;
                }
                )
            .addCase(createCompany.fulfilled,(state,action)=>{
                state.companies = action.payload;
                state.error = null ;
            })
            .addCase(createCompany.rejected,(state,action)=>
            {
                state.companies = action.payload;
                state.error = null;
            })
            .addCase(fetchCompanyById.fulfilled,(state,action)=>{
                state.companies = action.payload;
                state.error = null ;
            })
            .addCase(fetchCompanyById.rejected,(state,action)=>
            {
                state.companies = action.payload;
                state.error = null;
            })


    }





})

export const selectCompanyById = (companyId) => (state) => {
    return state.company.companies.find(company => company.idCompany === companyId);
};

export default companySlice.reducer;