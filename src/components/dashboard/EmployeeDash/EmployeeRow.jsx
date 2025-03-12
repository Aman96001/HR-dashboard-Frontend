import { useState, useRef } from "react";
import axios from "axios";

const EmployeeRow = ({ employee, index, fetchEmployees }) => {
  //eslint-disable-next-line no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
//handinling delete employee
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const deleteEmployeesUrl = new URL(`${employee._id}`, process.env.REACT_APP_BACKEND_URL).toString();
      
        await axios.delete(deleteEmployeesUrl); //call api to delete emploee
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  


  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{employee.fullName}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td>{employee.date}</td>
        <td>
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>Edit</button>
                <button className="dropdown-item" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default EmployeeRow;
