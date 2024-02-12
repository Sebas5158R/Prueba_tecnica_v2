import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardEmployee from "./pages/employees/dashboardEmployee";
import ModuleEmployees from "./pages/employees/moduleEmployees";
import ModuleCustomers from "./pages/customers/moduleCustomers";
import EditUser from "./pages/EditUser";
import ModuleCompanies from "./pages/companies/moduleCompanies";


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element = {<Login/>}/>
          <Route path="/dashboardEmployee" exact element = {<DashboardEmployee/>}/>
          <Route path="/employees" exact element = {<ModuleEmployees/>}/>
          <Route path="/customers" exact element = {<ModuleCustomers/>}/>
          <Route path="/editUser/:id" exact element = {<EditUser/>}/>
          <Route path="/companies" exact element = {<ModuleCompanies/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
