import { configureStore } from "@reduxjs/toolkit";
import userReducer from './AuthSlice';
import usersReducer from './UserSlice';
import companyReducer from './CompanySlice';


const preloadedState = {
    user: {
      user: JSON.parse(localStorage.getItem('user')) || null,
      loading: false,
      userFromGoogle: JSON.parse(localStorage.getItem('userWithGoogle')) || null,
      error: null
    }
  };

const store = configureStore({
    reducer: {
        user: userReducer,
        users_from_db: usersReducer,
        company: companyReducer
    },
    preloadedState
});

export default store;