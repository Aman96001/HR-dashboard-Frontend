import React from "react";
import "./Logout.css"; // Ensure you have styles for the popup

const LogoutPopup = ({ onClose, onLogout }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">Log Out</div>
        <div className="modal-content">Are you sure you want to log out?</div>
        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
