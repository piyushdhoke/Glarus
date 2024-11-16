import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/employeeAction"; 
import { Button, Table, Modal, Container, Alert } from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";
import AddSalaryForm from "./AddSalaryForm";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSalaries, setEmployeeSalaries] = useState([]);  
  const [salaryLoading, setSalaryLoading] = useState(false);
  const [salaryError, setSalaryError] = useState(null);

  
  const handleEmployeeClick = async (employee) => {
    if (!employee || !employee._id) {
      console.error("Invalid employee object:", employee); 
      return;
    }

    console.log("Employee clicked:", employee); 

    setSelectedEmployee(employee);
    setSalaryLoading(true);
    setSalaryError(null);

    try {
      const response = await axios.get(`http://localhost:5000/salaries/${employee._id}`);
      console.log("Fetched salary data:", response.data);
     
      if (response.data.salaries && response.data.salaries.length > 0) {
        setEmployeeSalaries(response.data.salaries); 
      } else {
        setEmployeeSalaries([]); 
      }
      setShowSalaryModal(true);
    } catch (err) {
      setSalaryError("Failed to load salary data.");
    } finally {
      setSalaryLoading(false);
    }
  };

  const handleAddSalary = (employee) => {
    setSelectedEmployee(employee);
    setShowSalaryModal(true); 
  };

  const handleCloseSalaryModal = () => {
    setShowSalaryModal(false); 
    setSelectedEmployee(null); 
    setEmployeeSalaries([]); 
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
    dispatch(getEmployees())
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(getEmployees()); 
    
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      <Container>
        <Button onClick={handleAdd} variant="primary" className="mb-3">
          Add Employee
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  
                  <Button variant="link" onClick={() => handleEmployeeClick(employee)}>
                    {employee.name}
                  </Button>
                </td>
                <td>{employee.age}</td>
                <td>{employee.address}</td>
                <td>
                  
                  <Button variant="success" size="sm" onClick={() => handleAddSalary(employee)}>
                    Add Salary
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleEdit(employee)} variant="warning" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for editing or adding employee */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editingEmployee ? "Edit Employee" : "Add Employee"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EmployeeForm employee={editingEmployee} handleCloseModal={handleCloseModal} />
          </Modal.Body>
        </Modal>

        {/* Add Salary Modal */}
        {selectedEmployee && (
          <Modal show={showSalaryModal} onHide={handleCloseSalaryModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Salary for {selectedEmployee.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddSalaryForm employee={selectedEmployee} handleCloseModal={handleCloseSalaryModal} />
            </Modal.Body>
          </Modal>
        )}

        {/* Modal for displaying Salary Data */}
        {selectedEmployee && employeeSalaries.length > 0 && (
          <Modal show={showSalaryModal} onHide={handleCloseSalaryModal}>
            <Modal.Header closeButton>
              <Modal.Title>Salary Data for {selectedEmployee.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {salaryLoading ? (
                <p>Loading salary data...</p>
              ) : salaryError ? (
                <Alert variant="danger">{salaryError}</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Salary Month</th>
                      <th>Basic</th>
                      <th>HRA</th>
                      <th>Travel Allowance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeSalaries.map((salary, index) => (
                      <tr key={index}>
                        <td>{salary.salaryMonth}</td>
                        <td>{salary.Basic}</td>
                        <td>{salary.Hra}</td>
                        <td>{salary.travel}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseSalaryModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default EmployeeList;
