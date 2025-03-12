import { useEffect, useState, createContext, useCallback } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { EmployeeDash } from "./components/dashboard/EmployeeDash/EmployeeDash";
import { AttendanceDash } from "./components/dashboard/AttendanceDash/AttendanceDash";
import { LeaveDash } from "./components/dashboard/LeaveDash/LeaveDash";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const EmployeeContext = createContext();

function App() {
  const [employees, setEmployees] = useState([]);

  // ✅ Wrap fetchEmployees in useCallback to prevent re-creation
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/getEmployees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  // ✅ Fetch employees only once on mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  console.log(fetchEmployees)

  return (
    <div className="App">
      <EmployeeContext.Provider value={{ employees, fetchEmployees }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<EmployeeDash />} />
            <Route path="/attendance" element={<AttendanceDash />} />
            <Route path="/leave" element={<LeaveDash />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
