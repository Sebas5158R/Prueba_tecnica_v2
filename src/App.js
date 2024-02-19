import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import ModuleEmployees from "./pages/employees/moduleEmployees";
import ModuleCustomers from "./pages/customers/moduleCustomers";
import EditUser from "./pages/EditUser";
import ModuleCompanies from "./pages/companies/moduleCompanies";
import RegisterUser from "./pages/RegisterUser";
import SendCreationRequest from "./components/company/sendCreationRequest";
import EditCompany from "./pages/companies/editCompany";
import { Dashboard } from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";


const ProtectedDashboard = () => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return <Dashboard />;
};

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element = {<Login/>}/>
          <Route path="/createAccount" exact element = {<RegisterUser/>}/>
          <Route path="/forgotPassword" exact element = {<ForgotPassword/>}/>

          <Route path="/dashboard" element={<ProtectedDashboard />} />

          <Route path="/employees" exact element = {<ModuleEmployees/>}/>
          <Route path="/customers" exact element = {<ModuleCustomers/>}/>
          <Route path="/editUser/:id" exact element = {<EditUser/>}/>
          <Route path="/companies" exact element = {<ModuleCompanies/>}/>
          <Route path="/sendRequest" exact element = {<SendCreationRequest/>}/>
          <Route path="/editCompany/:id" exact element = {<EditCompany/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
