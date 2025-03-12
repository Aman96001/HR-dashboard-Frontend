import { useState, useRef, useEffect } from "react";
import axios from "axios";

const EmployeeRow = ({ employee, index, fetchEmployees }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handling delete employee
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteEmployee/${employee._id}`);
        console.log(`${process.env.REACT_APP_BACKEND_URL}/deleteEmployee/${employee._id}`); // call API to delete employee
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
            <button
              className="dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ⋮
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>
                  Edit
                </button>
                <button className="dropdown-item" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default EmployeeRow;
