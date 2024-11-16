import React, { useState } from "react";
import { Button, Form as BootstrapForm, Alert } from "react-bootstrap";
import axios from "axios";

const AddSalaryForm = ({ employee, handleCloseModal }) => {
  const [salaryMonth, setSalaryMonth] = useState("");
  const [Hra, setHra] = useState("");
  const [basic, setBasic] = useState("");
  const [travel, setTravel] = useState("");
  const [error, setError] = useState(""); // State to track error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const basicNumber = parseFloat(basic);
    const hraNumber = parseFloat(Hra);
    const travelNumber = parseFloat(travel);

    
    if (isNaN(basicNumber) ||isNaN(hraNumber) || isNaN(travelNumber)) {
      setError("HRA and Travel must be valid numbers.");
      return; 
    }

    
    setError("");

  
    const salaryData = { salaryMonth, Basic: basicNumber, Hra: hraNumber, travel: travelNumber };

    try {
      const response = await axios.post(
        `http://localhost:5000/salaries/${employee._id}`,
        salaryData
      );
      console.log("Salary submitted successfully:", response.data);
      handleCloseModal(); 
    } catch (err) {
      console.error("Error submitting salary:", err.response ? err.response.data : err.message);
      setError("An error occurred while submitting the salary.");
    }
  };

  return (
    <BootstrapForm onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>} 

      <BootstrapForm.Group controlId="formSalaryMonth">
        <BootstrapForm.Label>Salary Month</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          value={salaryMonth}
          onChange={(e) => setSalaryMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </BootstrapForm.Control>
      </BootstrapForm.Group>

      <BootstrapForm.Group controlId="formHra">
        <BootstrapForm.Label>Basic</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text" 
          placeholder="Enter Basic"
          value={basic}
          onChange={(e) => setBasic(e.target.value)}
        />
      </BootstrapForm.Group>
      <BootstrapForm.Group controlId="formHra">
        <BootstrapForm.Label>HRA</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text" 
          placeholder="Enter HRA"
          value={Hra}
          onChange={(e) => setHra(e.target.value)}
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group controlId="formTravel">
        <BootstrapForm.Label>Travel Allowance</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text" 
          placeholder="Enter Travel Allowance"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        />
      </BootstrapForm.Group>

      <Button variant="primary" type="submit">
        Add Salary
      </Button>
    </BootstrapForm>
  );
};

export default AddSalaryForm;
