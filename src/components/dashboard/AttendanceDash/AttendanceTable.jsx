import React,{useEffect,useContext} from 'react'
import { EmployeeContext } from '../../../App'  
import { AttendanceRow } from './AttendanceRow'
export const AttendanceTable = () => {

    const { employees, fetchEmployees } = useContext(EmployeeContext);
useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  return (
    <div>
          <table className="tableMain">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>
            Stauts
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <AttendanceRow
                key={employee._id}
                employee={employee}
                index={index}
                fetchEmployees={fetchEmployees} // Pass fetch function for reloading
              />
            ))
          ) : (
            <tr>
              <td colSpan="7">No employees found.</td>
            </tr>
          )}
        </tbody>

    </table>
    </div>
  )
}
