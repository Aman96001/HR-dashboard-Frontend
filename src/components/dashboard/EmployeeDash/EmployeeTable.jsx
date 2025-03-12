import React, { useContext, useEffect } from "react";
import EmployeeRow from "./EmployeeRow";
import { EmployeeContext } from "../../../App"; // Ensure correct import

export const EmployeeTable = () => {
  const { employees, fetchEmployees } = useContext(EmployeeContext);

  // Fetch employees only once when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]); // Include fetchEmployees in dependency array

  return (
    <div>
      <table className="tableMain">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <EmployeeRow
                key={employee._id}
                employee={employee}
                index={index}
                fetchEmployees={fetchEmployees} // Pass fetch function for reloading
              />
            ))
          ) : (
            <tr>
              <td colSpan="7">No employees found.</td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
