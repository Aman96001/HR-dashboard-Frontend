import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import CandidateTable from "./CandidateTable";
import AddCandidateModal from "../Util/pops/CandidateModal";
import "./dashboard.css";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]); // Stores all candidates
  const [filteredCandidates, setFilteredCandidates] = useState([]); // Stores filtered candidates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCandidates(); // Fetch all candidates 
  }, []);

  // Fetch candidates from backend
  const fetchCandidates = async (searchTerm = "") => {
    try {
      
      const response = await axios.get(`${process.evn.REACT_APP_BACKEND_URL}/getCandidates/${searchTerm}`);
      setCandidates(response.data);
      setFilteredCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Handle search input
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

  
    if (value.trim() === "") {
      setFilteredCandidates(candidates);
    } else {
      fetchCandidates(value);
    }
  };

  // Handle adding a new candidate
  const handleAddCandidate = async (newCandidate) => {
    try {
      const addCandidatesUrl = new URL("/addCandidates", process.env.REACT_APP_BACKEND_URL).toString();

      await axios.post(addCandidatesUrl, newCandidate);
      window.location.reload();
      fetchCandidates(); // Refresh list after adding
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="left"><p>Candidates</p></div>
          <div className="right">
            <p><i className="fa-regular fa-envelope"></i></p>
            <p><i className="fa-regular fa-bell"></i></p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="header">
          <div className="left">
            <select className="inputfield">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select className="inputfield">
              <option value="">Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <div className="right">
            <input
              className="inputfield"
              type="text"
              placeholder="Search by Name or Position..."
              value={searchTerm}
              onChange={handleSearch} // Handles search
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="open-modal-btn btn"
            >
              Add Candidate
            </button>
            {isModalOpen && (
              <AddCandidateModal
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddCandidate}
              />
            )}
          </div>
        </div>

        {/* Candidate Table */}
        <CandidateTable
          candidates={filteredCandidates}
          fetchCandidates={fetchCandidates}
        />
      </div>
    </div>
  );
}
