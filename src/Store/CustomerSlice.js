import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";

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

const customerSlice = createSlice({
    name: "customers",
    initialState: {
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCustomersForExcel.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
        })
        .addCase(addCustomersForExcel.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
        })
    }
});

export default customerSlice.reducer;