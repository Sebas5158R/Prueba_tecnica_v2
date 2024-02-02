import { configureStore } from "@reduxjs/toolkit";
import userReducer from './AuthSlice';
import employeesReducer from './EmployeeSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        employees: employeesReducer
    }
});

export default store;