import { useState, useRef } from "react";
import axios from "axios";
import CandidateModal from "../Util/pops/CandidateModal";

const CandidateRow = ({ candidate, index, fetchCandidates, fetchEmployees }) => {
  const [selectedStatus, setSelectedStatus] = useState(candidate.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      if (newStatus === "Selected") {
        // Move candidate to Employee table
        const backendURL = new URL("/addEmployee", process.env.BACKEND_URL).toString();
        await axios.post(backendURL, {
          fullName: candidate.fullName,
          email: candidate.email,
          phone: candidate.phone,
          department: candidate.position|| "HR", // Default department
          date: new Date().toISOString().split("T")[0], 
        });

      } else if (newStatus === "Rejected") {
        // Delete candidate from database
      
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${candidate._id}`); //call api to delete candidate
      }

      fetchCandidates(); // Refresh candidate list
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{candidate.fullName}</td>
        <td>{candidate.email}</td>
        <td>{candidate.phone}</td>
        <td>{candidate.position}</td>
        <td>
          <select value={selectedStatus} onChange={handleStatusChange} className="inputfield">
            <option value="New">New</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </td>
        <td>{candidate.experience} years</td> 
        <td>
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>Edit</button>
                <button className="dropdown-item" onClick={() => handleStatusChange({ target: { value: "Rejected" } })}>Delete</button>
              </div>
            )}
          </div>
        </td>
      </tr>

      {isModalOpen && (
        <CandidateModal
          onClose={() => setIsModalOpen(false)}
          refresh={fetchCandidates}
          candidate={candidate}
        />
      )}
    </>
  );
};

export default CandidateRow;
