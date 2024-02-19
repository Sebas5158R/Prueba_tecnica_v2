import React from "react";
import { BrowserRouter as Route, Navigate } from 'react-router-dom';
import DashboardCustomers from "../pages/customers/dashboardCustomers";
import DashboardEmployee from "../pages/employees/dashboardEmployee";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
        localStorage.getItem('user') ? (
            <Component {...props}/>
        ) : (
            <Navigate to={{ pathname: '/', state: { from:props.location } }}/>
        )
    }
    />
);

export const Dashboard = () => {
    const token = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles;
    const rolesString = roles.toString();
    const rolesArray = rolesString.replace(/[[\]]/g, '');

    let rolesSplit = rolesArray.split(',');
    
    if (rolesSplit.includes('SUPER_ADMINISTRADOR') || rolesArray.includes('ADMINISTRADOR')) {
      return <DashboardEmployee />;
    } else if (rolesSplit.includes('CLIENTE')) {
      return <DashboardCustomers />;
    }
  };