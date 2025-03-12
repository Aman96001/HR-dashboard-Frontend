import React, { useState, useRef } from "react";
import "./AttendanceRow.css"; // Import the CSS file

export const AttendanceRow = ({ employee, index }) => {
    // eslint-disable-next-line no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // State to track attendance status (default: "Present")
  const [attendanceStatus, setAttendanceStatus] = useState("Present");

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{employee.fullName}</td>
      <td>{employee.department}</td>
      <td>
    
        <select
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
          className={`attendance-dropdown ${
            attendanceStatus === "Present" ? "attendance-present" : "attendance-absent"
          }`}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </td>
      <td>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>Edit</button>
              <button className="dropdown-item">Delete</button>
            </div>
          )}
        </div>
      </td>
      
    </tr>
  );
};
