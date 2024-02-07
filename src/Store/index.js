import { configureStore } from "@reduxjs/toolkit";
import userReducer from './AuthSlice';
import usersReducer from './UserSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        users_from_db: usersReducer
    }
});

export default store;