import { useState } from "react";
import { NavLink} from "react-router-dom"; // Import NavLink and useLocation
import "./Navbar.css";
import Logo from "../Util/Logo";
import Logout from "../Util/pops/Logout"; // Import LogoutPopup component

export default function Navbar() {
  
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect after logout
  };

  return (
    <nav className="sidenav">
      <Logo />
      <div className="search-container">
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <p className="navtitle">Recruitment</p>
      <p className="navlink">
        <NavLink to="/dashboard" activeClassName="active-link">
          <i className="fa-regular fa-user"></i> Candidates
        </NavLink>
      </p>

      <p className="navtitle">Organization</p>
      <ul>
        <li>
          <NavLink to="/employee" activeClassName="active-link">
            <i className="fa-regular fa-circle-user"></i> Employee
          </NavLink>
        </li>
        <li>
          <NavLink to="/attendance" activeClassName="active-link">
            <i className="fa-regular fa-heart"></i> Attendance
          </NavLink>
        </li>
        <li>
          <NavLink to="/leave" activeClassName="active-link">
            <i className="fa-regular fa-rectangle-xmark"></i> Leaves
          </NavLink>
        </li>
      </ul>

      <p className="navtitle">Other</p>
      <p className="navlink" onClick={() => setShowLogoutPopup(true)}>
        <i className="fa-regular fa-circle-right"></i> Logout
      </p>

      {showLogoutPopup && (
        <Logout
          onClose={() => setShowLogoutPopup(false)}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
}
