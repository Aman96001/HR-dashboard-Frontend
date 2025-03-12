import { useState } from "react";
import axios from "axios";
import "./Addcandidats.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveModal = ({ onClose, refresh }) => {
  const initialFormState = {
    fullName: "",
    employeeEmail: "",
    leaveDate: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addLeaveUrl = new URL("/add-leave", process.env.REACT_APP_BACKEND_URL).toString();

      await axios.post(addLeaveUrl, formData);
      toast.success("Leave request added successfully!");
      refresh();
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <span>Add Leave Request</span>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name*" required value={formData.fullName} onChange={handleChange} />
          <input type="email" name="employeeEmail" placeholder="Employee Email*" required value={formData.employeeEmail} onChange={handleChange} />
          <input type="date" name="leaveDate" required value={formData.leaveDate} onChange={handleChange} />
          <input type="text" name="reason" placeholder="Reason*" required value={formData.reason} onChange={handleChange} />
          
          <div className="modal-buttons">
            <button className="save-btn enabled btn" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button onClick={onClose} className="cancel-btn" type="button">Cancel</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeaveModal;
