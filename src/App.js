import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardEmployee from "./pages/employees/dashboardEmployee";
import ListEmployees from "./pages/employees/listEmployees";


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element = {<Login/>}/>
          <Route path="/dashboardEmployee" exact element = {<DashboardEmployee/>}/>
          <Route path="/employees" exact element = {<ListEmployees/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
