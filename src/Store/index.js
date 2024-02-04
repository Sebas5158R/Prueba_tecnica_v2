import { configureStore } from "@reduxjs/toolkit";
import userReducer from './AuthSlice';
import employeesReducer from './EmployeeSlice';
import customersReducer from './CustomerSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        employees: employeesReducer,
        customers: customersReducer
    }
});

export default store;