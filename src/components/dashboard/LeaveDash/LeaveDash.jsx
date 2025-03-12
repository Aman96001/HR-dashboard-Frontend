import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import  LeaveTable  from "./LeaveTable";
import LeaveModal from "../../Util/pops/LeaveModal"; 

export const LeaveDash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="left"><p>Leave</p></div>
          <div className="right">
            <p><i className="fa-regular fa-envelope"></i></p>
            <p><i className="fa-regular fa-bell"></i></p>
          </div>
        </div>

        {/* Filters & Add Button */}
        <div className="header">
          <div className="left">
            <select className="inputfield">
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="right">
            <input className="inputfield" type="text" placeholder="Search by Name..." />
            <button onClick={() => setIsModalOpen(true)} className="open-modal-btn btn">
              Add Leave
            </button>
            {isModalOpen && (
              <LeaveModal onClose={() => setIsModalOpen(false)}  />
            )}
          </div>
        </div>

        {/* Leave Table */}
        <LeaveTable />
      </div>
    </div>
  );
};
