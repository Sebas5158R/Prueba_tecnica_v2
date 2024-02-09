import { configureStore } from "@reduxjs/toolkit";
import userReducer from './AuthSlice';
import usersReducer from './UserSlice';
import companyReducer from "./companySlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        users_from_db: usersReducer,
        company:companyReducer
    }
});

export default store;