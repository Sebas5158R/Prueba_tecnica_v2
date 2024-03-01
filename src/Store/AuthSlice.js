import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCrendentials)=> {
        const request = await api.post('/auth/login', userCrendentials);
        const response = await request.data;
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.token));
        return response;
    }
);

export const loginUserAction = createAsyncThunk(
    'auth/loginUserAction',
    async(userCrendentialsGoogle) => {
        const request = userCrendentialsGoogle;
        console.log(request);
        localStorage.setItem('userWithGoogle', JSON.stringify(request));
        return request;
    }
);

export const loginWithGoogle = createAsyncThunk(
    'user/loginWithGoogle',
    async(googleToken)=> {
        const request = await api.post(`/auth/loginWithGoogle?tokenId=${googleToken}`);
        const response = await request.data;
        localStorage.setItem('user', JSON.stringify(response.token));
        console.log(response);
        
        return response;
    }
);

export const completeData = createAsyncThunk(
    'auth/completeData',
    async (userData) => {
        try {
            const request = await api.post('/auth/completeData', userData);
            console.log(request);
            const response = await request.data;
            localStorage.setItem('user', JSON.stringify(response.token));
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const logout = () => ({
    type: 'LOGOUT',
  });
  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        userFromGoogle: null,
        msg: null,
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
            localStorage.removeItem("userWithGoogle");
            window.location.replace("/");
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                userFromGoogle: null,
            };
        })

        .addCase(loginUserAction.fulfilled, (state, action) => {
            state.userFromGoogle = action.payload;
            state.error = null;
            // setTimeout( function() { window.location.href = "http://localhost:3000/completeData"; }, 3000 );
        })

        .addCase(loginUserAction.rejected, (state, action) => {
            state.userFromGoogle = null;
            console.log(action.error.message);
        })



        .addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
            setTimeout( function() { window.location.href = "http://localhost:3000/dashboard"; }, 1000 );
        })
        .addCase(loginWithGoogle.rejected, (state, action) => {
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === "Request failed with status code 500") {
                alert("Debes de llenar un formulario antes de seguir");
                setTimeout( function() { window.location.href = "http://localhost:3000/completeData"; }, 2000 );
            }
        })

        .addCase(completeData.pending, (state) => {
            state.loading = true;
            state.msg = null;
            state.error = null;
        })
        .addCase(completeData.fulfilled, (state, action) => {
            state.loading = false
            state.msg = action.payload;
            state.error = null;
            setTimeout( function() { window.location.href = "http://localhost:3000/dashboard"; }, 2000 );
        })
        .addCase(completeData.rejected, (state, action) => {
            state.loading = false;
            state.msg = null;
            console.log(action.error.message);
            if(action.error.message === "Request failed with status code 400") {
                state.error = 'There is already a registered user with that email';
            } else if(action.error.message === "Request failed with status code 403") {
                state.error = 'There is already a registered user with that document or telephone number';
            }
             else {
                state.error = action.error.message;
            }
        })
    }
});

export default userSlice.reducer;