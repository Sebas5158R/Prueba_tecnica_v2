import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";
import {userByEmail, userById} from "./UserSlice";
import {useEffect} from "react";
import {fetchComapanies} from "./CompanySlice";
import {useDispatch, useSelector} from "react-redux";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCrendentials)=> {
      console.log("5444444454")
        console.log(userCrendentials)
        const request = await api.post('/auth/login', userCrendentials);
        const response = await request.data;
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.token));
        localStorage.setItem('email',JSON.stringify(userCrendentials.email))
        if (response.user.using2FA===true){
            console.log(" esta usuando 2fa")
        }

        return response;
    }
);

export const  veryfyCodeLog = createAsyncThunk (
    'code/validate',
    async  (validateDTO) =>{
        try {
            console.log("validate Dto en log")
            console.log(validateDTO)
            console.log(validateDTO.email)



            const  response = await api.post('/code/validate/key',validateDTO)
            console.log("this is response")
            console.log(response.data)
            return response.data
                ;
        } catch (error){
            throw  error;
        }
    }
);


export const logout = () => ({
    type: 'LOGOUT',
  });
  
const userSlice = createSlice({
    name:'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.user = action.payload;
            state.error = null;

            console.log("oee")
            console.log(action.payload)
            console.log(action.payload.user.using2FA)
           console.log(action.payload.user)
            if (action.payload.user.using2FA===true){
             window.location.replace('/form2FA')
            }
            else {
                window.location.replace('/dashboard')
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log("Entraste al rejected")
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 500') {
                state.error = 'Access Denied! Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase('LOGOUT', (state) => {
            localStorage.removeItem("user");
            window.location.replace("/");
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        })
            .addCase(veryfyCodeLog.fulfilled,(state, action)=>{
                console.log("esta medio sirviendo")
                console.log(action.payload)
               if (action.payload.valid===true){

                   window.location.replace('/dashboard')
                   }
   else {
       window.alert("incorrect code")
       window.location.replace('/form2FA')
               }
                }
            )



    }
});

export default userSlice.reducer;