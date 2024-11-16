
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeSalary = () => {
  const { id } = useParams(); 
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/salaries${id}`)   
      .then((response) => {
        setSalaryDetails(response.data);
      })
      .catch((err) => {
        setError("Error fetching salary details");
        console.error(err);
      });
  }, [id]);

  return (
    <div>
      <h2>Salary Details for Employee ID: {id}</h2>
      {error && <p>{error}</p>}
      {salaryDetails.length === 0 ? (
        <p>No salary records found.</p>
      ) : (
        <ul>
          {salaryDetails.map((salary) => (
            <li key={salary._id}>
              <p>
                <strong>Month:</strong> {salary.salaryMonth}
              </p>
              <p>
                <strong>HRA:</strong> {salary.Hra}
              </p>
              <p>
                <strong>Travel Allowance:</strong> {salary.travel}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeSalary;
