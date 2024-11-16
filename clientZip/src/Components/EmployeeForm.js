
import React, { useState, useEffect } from "react";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../redux/employeeAction"; 

const EmployeeForm = ({ employee, handleCloseModal }) => {
  const dispatch = useDispatch();

  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  
  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setAge(employee.age);
      setAddress(employee.address);
    }
  }, [employee]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = { name, age, address };

    if (employee) {
      
      dispatch(updateEmployee(employee._id, newEmployee));
    } else {
      
      dispatch(addEmployee(newEmployee));
    }

    handleCloseModal(); 
  };

  return (
    <BootstrapForm onSubmit={handleSubmit}>
      <BootstrapForm.Group controlId="formName">
        <BootstrapForm.Label>Name</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group controlId="formAge">
        <BootstrapForm.Label>Age</BootstrapForm.Label>
        <BootstrapForm.Control
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group controlId="formAddress">
        <BootstrapForm.Label>Address</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </BootstrapForm.Group>

      <Button variant="primary" type="submit">
        {employee ? "Update Employee" : "Add Employee"}
      </Button>
    </BootstrapForm>
  );
};

export default EmployeeForm;


