import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeaveRow } from "./LeaveRow";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/Leaves`)
      .then(response => setLeaves(response.data))
      .catch(error => console.error("Error fetching leaves:", error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Employee Name</th>
          <th>Leave Date</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave, index) => (
          <LeaveRow
            key={leave._id}
            index={index + 1}
            fullName={leave.fullName}
            leaveDate={leave.leaveDate}
            reason={leave.reason}
            status={leave.status}
          />
        ))}
      </tbody>
    </table>
  );
};

export default LeaveTable;
