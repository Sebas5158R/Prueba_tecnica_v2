import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";
import {userByEmail, userById} from "./UserSlice";
import {useEffect} from "react";
import {fetchComapanies} from "./CompanySlice";
import {useDispatch, useSelector} from "react-redux";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCrendentials)=> {
        console.log(userCrendentials)
        const request = await api.post('/auth/login', userCrendentials);
        const response = await request.data;
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.token));
        localStorage.setItem('email',JSON.stringify(userCrendentials.email))
        return response;
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
    }
});

export default userSlice.reducer;