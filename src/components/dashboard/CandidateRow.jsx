import { useState, useRef, useEffect } from "react";
import axios from "axios";
import CandidateModal from "../Util/pops/CandidateModal";
import "react-toastify/dist/ReactToastify.css";

const CandidateRow = ({ candidate, index, fetchCandidates, fetchEmployees }) => {
  const [selectedStatus, setSelectedStatus] = useState(candidate.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      if (newStatus === "Selected") {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addEmployee`, {
          fullName: candidate.fullName,
          email: candidate.email,
          phone: candidate.phone,
          department: candidate.position || "HR",
          date: new Date().toISOString().split("T")[0],
        });
        alert("Candidate added to Employee");
      } else if (newStatus === "Rejected") {
        alert("You have rejected this candidate.");
      }

      fetchCandidates();
      fetchEmployees();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this candidate?");
    if (!isConfirmed) return;

    try {
      const deleteCandidateUrl = `${process.env.REACT_APP_BACKEND_URL}/delete/${candidate._id}`;
      await axios.delete(deleteCandidateUrl);
      fetchCandidates();
      alert("Candidate deleted successfully.");
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Failed to delete candidate. Please try again.");
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
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="inputfield"
            style={{
              color:
                selectedStatus === "Selected"
                  ? "green"
                  : selectedStatus === "Rejected"
                  ? "red"
                  : "black",
            }}
          >
            <option value="New">New</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </td>
        <td>{candidate.experience} years</td>
        <td>
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
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
