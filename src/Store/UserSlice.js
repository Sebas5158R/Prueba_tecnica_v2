import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await api.get('/user/listUsers', {
            
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUsers',
    async (userData) => {
        try {
            const response = await api.post('/user/addUser', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const addCustomersForExcel = createAsyncThunk(
    'customers/addCustomersForExcel',
    async (file) => {
        try {
            const response = await api.post('/user/uploadUsersData', file);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);


const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 500') {
                state.error = 'Access Denied! Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(addUser.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
        })
        .addCase(addCustomersForExcel.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(addCustomersForExcel.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
            if (action.error.status === 403) {
                state.error = 'Access denied, you do not have the role to list clients.';
            } else {
                state.error = action.error.message;
            }
        })
    }

});

export default userSlice.reducer;