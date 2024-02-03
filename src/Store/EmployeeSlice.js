import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";

export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
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

export const addEmployee = createAsyncThunk(
    'employees/addEmployee',
    async (employeeData) => {
        try {
            const response = await api.post('/user/addUser', employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployees.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 500') {
                state.error = 'Access Denied! Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(addEmployee.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
        })
    }

});

export default employeeSlice.reducer;