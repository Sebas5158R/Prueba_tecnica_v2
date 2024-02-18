import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardEmployee from "./pages/employees/dashboardEmployee";
import ModuleEmployees from "./pages/employees/moduleEmployees";
import ModuleCustomers from "./pages/customers/moduleCustomers";
import EditUser from "./pages/EditUser";
import ModuleCompanies from "./pages/companies/moduleCompanies";
import RegisterUser from "./pages/RegisterUser";
import SendCreationRequest from "./components/company/sendCreationRequest";
import EditCompany from "./pages/companies/editCompany";
import DashboardCustomers from "./pages/customers/dashboardCustomers";


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element = {<Login/>}/>
          <Route path="/createAccount" exact element = {<RegisterUser/>}/>
          <Route path="/dashboardEmployee" exact element = {<DashboardEmployee/>}/>
          <Route path="/employees" exact element = {<ModuleEmployees/>}/>
          <Route path="/customers" exact element = {<ModuleCustomers/>}/>
          <Route path="/editUser/:id" exact element = {<EditUser/>}/>
          <Route path="/companies" exact element = {<ModuleCompanies/>}/>
          <Route path="/sendRequest" exact element = {<SendCreationRequest/>}/>
          <Route path="/editCompany/:id" exact element = {<EditCompany/>}/>


          <Route path="/dashboardCustomer" exact element = {<DashboardCustomers/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
