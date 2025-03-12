import React, { useState } from "react";
import "./LeaveRow.css"; // Import your CSS file

export const LeaveRow = ({ index, fullName, leaveDate, reason }) => {
  const [status, setStatus] = useState("Pending");

  return (
    <tr>
      <td>{index}</td>
      <td>{fullName}</td>
      <td>{new Date(leaveDate).toLocaleDateString()}</td>
      <td>{reason}</td>
      <td>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`status-dropdown ${status.toLowerCase()}`}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
    </tr>
  );
};
