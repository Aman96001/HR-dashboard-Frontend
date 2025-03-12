import { useState, useEffect } from "react";
import axios from "axios";
import "./Addcandidats.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidateModal = ({ onClose, refresh, candidate }) => {
  const initialFormState = {
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "0", // Default value
    date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (candidate) {
      setFormData({
        fullName: candidate.fullName || "",
        email: candidate.email || "",
        phone: candidate.phone || "",
        position: candidate.position || "",
        experience: candidate.experience || "0",
        date: candidate.date || "",
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      if (candidate) {
        await axios.put(`http://localhost:8080/update/${candidate._id}`, formData);
        toast.success("Candidate updated successfully!");
      } else {
        await axios.post("http://localhost:8080/addcandidates", formData);
        window.location.reload();
        toast.success("Candidate added successfully!");
      }
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
          <span>{candidate ? "Edit Candidate" : "Add New Candidate"}</span>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name*" required value={formData.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address*" required value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number*" required value={formData.phone} onChange={handlePhoneChange} pattern="[0-9]*" inputMode="numeric" />
          <select name="position" required value={formData.position} onChange={handleChange}>
            <option value="">Select Position*</option>
            <option value="Developer">Developer</option>
            <option value="Programmer">Programmer</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" name="experience" placeholder="Experience*" required value={formData.experience} onChange={handleChange} />
          <input type="date" name="date" required value={formData.date} onChange={handleChange} />

          <div className="modal-buttons">
            <button className="save-btn enabled btn" disabled={loading}>{loading ? "Saving..." : candidate ? "Update Candidate" : "Save"}</button>
            <button onClick={onClose} className="cancel-btn" type="button">Cancel</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CandidateModal;
