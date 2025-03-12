import React from 'react'
import Navbar from '../../Navbar/Navbar'
import { EmployeeTable } from './EmployeeTable'
import "../dashboard.css"
export const EmployeeDash = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="left"><p>Employees</p></div>
          <div className="right">
            <p><i className="fa-regular fa-envelope"></i></p>
            <p><i className="fa-regular fa-bell"></i></p>
          </div>
        </div>

       
        <div className="header">
          <div className="left">
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
            />
          </div>
        </div>
      <EmployeeTable />
      </div>
    </div>

  )
}
