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
import ResetPassword from "./pages/ResetPassword";

import Profile from "./components/Profile";
import Form2FA from "./components/Form2FA";

import CompleteData from "./pages/loginGoogle";
import FormValidateCompany from "./components/company/validateCodeCompany";
import ReviewCompany from "./pages/companies/reviewCompany.js";
import ResponseCompany from "./pages/companies/responseCompany";



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
          <Route path="/completeData" exact element = {<CompleteData/>}/>
          <Route path="/createAccount" exact element = {<RegisterUser/>}/>
          <Route path="/forgotPassword" exact element = {<ForgotPassword/>}/>
          <Route path="/resetPassword" exact element = {<ResetPassword/>}/>
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/employees" exact element = {<ModuleEmployees/>}/>
          <Route path="/customers" exact element = {<ModuleCustomers/>}/>
          <Route path="/editUser/:id" exact element = {<EditUser/>}/>
          <Route path="/companies" exact element = {<ModuleCompanies/>}/>
          <Route path="/sendRequest" exact element = {<SendCreationRequest/>}/>
          <Route path="/editCompany/:id" exact element = {<EditCompany/>}/>
          <Route path="/profile" exact element={<Profile/>}/>
          <Route path={"/form2FA"} exact element={ <Form2FA/>}> </Route>
          <Route path={"/formValidateCode"}  exact element={<FormValidateCompany/>}></Route>
          <Route path={"/reviewCompany"} exact element={<ReviewCompany/>}/>
          <Route path={"/responseCompany"} exact element={<ResponseCompany/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
