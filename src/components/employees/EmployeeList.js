import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'
import EmployeeCard from './EmployeeCard'


const EmployeeList = (props) => {
  
  const [employees, setEmployees] = useState([])

  const getEmployees = () => {
    DataManager.get('employees')
    .then(employeesFromDatabase => setEmployees(employeesFromDatabase))
  }

  useEffect(getEmployees, [])

  return (
    <>
      <div className="card-container">
        {employees.map(employee => 
          <EmployeeCard key={employee.id} {...props} {...employee} />
        )}
      </div>
    </>
  )
}

export default EmployeeList