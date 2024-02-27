import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../services/URLService";

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
          const response = await  api.post('/company/addCompany',companyData);
          return response.data;
         }
    catch (e) {
          throw  e;
        }
    }
);

export const companyById = createAsyncThunk(
    'company/companyById',
    async (idCompany) => {
        try {
            const response = await api.get(`/company/listCompany/${idCompany}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const updateCompany = createAsyncThunk(
    'company/updateCompany',
    async ({ id, companyData }) => {
        try {
            const response = await api.put(`/company/updateCompany/${id}`, companyData);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);


const  companySlice = createSlice({
    name : "companies",
    initialState:{
        loading: false,
        companyToEdit: null,
        companies:[],
        error : null

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
            .addCase(addCompanie.pending, (state) => {
                state.loading = true;
                state.companies = null;
                state.error = null
            })
            .addCase(addCompanie.fulfilled,(state,action) => {
                state.loading = true
                state.companies = action.payload ;
                state.companies=null;

                window.alert("Solicitud enviada exitosamente");
                window.location.replace("/companies");
            })
            .addCase(addCompanie.rejected,(state,action) =>{
                state.loading = false
                state.companies = action.payload;
                state.error = null;
            })

            .addCase(companyById.fulfilled, (state, action) => {
                state.companyToEdit = action.payload;
                state.error = null;
            })

            .addCase(updateCompany.fulfilled, (state, action) => {
                state.companies = action.payload;
                state.error = null;
                window.alert("Compañia editada con éxito");
                window.location.replace("/companies");
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.companies = [];
                console.log(action.error.message);
            })


    }
});

export default companySlice.reducer;