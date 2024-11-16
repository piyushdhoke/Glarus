// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
import EmployeeSalary from "./Components/EmployeeSalary";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Employee Management</h1>
        
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeSalary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
