import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../services/URLService";

export  const  fetchComapanies  = createAsyncThunk(
   'companies/fetchCompanies',
   async (companyData) =>{
       try {{

       }
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

export const companyByUser = createAsyncThunk(
    'company/companyByUser',
    async (email) => {
        try {
            const response = await api.get(`/company/companyFrom?email=${email}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const fileByNameCompany = createAsyncThunk(
    'company/fileByNameCompany',
    async (nameCompany) => {
        try {
            const response = await api.get(`/company/files/${nameCompany}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export  const validateCodeCompany  = createAsyncThunk (
  'company/ValidateCode',
  async (validateCode) =>{

      try{
      const validateCodeDTO = {
          idCompany:validateCode.companyOption,
          code:validateCode.code
      }

      console.log(validateCode)
      const  response  = await  api.post('company/validateCodeCompany', validateCodeDTO)
   console.log(response)
          return response
  }
catch (e) {
    throw e;
  }
  }
  );

export  const  changeState  = createAsyncThunk(
  'company/ changeState',
  async  (idCompany)=>{
      try {
       const id = idCompany
          console.log(id)
          const  response = await api.post(`company/changeState/${idCompany}`)
  console.log(response);
          return response
      }catch (e) {
          throw e
      }
  }

);

const  companySlice = createSlice({
    name : "companies",
    initialState:{
        loading: false,
        companyToEdit: null,
        companies:[],
        userCompany: [],
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
            .addCase(validateCodeCompany.fulfilled,(state,action)=>{

                console.log("response")
              const  response1=action.payload
console.log(response1)
                console.log(action.payload.data)
                if (action.payload.data){
                    window.location.replace('/companies')
                }
                else{
                    window.alert("Ups incorrect code ")
                    window.location.replace('/formValidateCode')

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

            .addCase(companyByUser.fulfilled, (state, action) => {
                state.userCompany = action.payload;
                state.error = null;
            })
            .addCase(companyByUser.rejected, (state, action) => {

                state.companies = null;
                console.log(action.error.message);
            })

            .addCase(fileByNameCompany.fulfilled, (state, action) => {
                state.file = action.payload;
                state.error = null;
            })


            .addCase(fileByNameCompany.rejected, (state, action) => {
                state.file = null;

                state.userCompany = [];
                console.log(action.error.message);
            })



    }
});

export default companySlice.reducer;