import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'


const EmployeeDetails = (props) => {
  const [employee, setEmployee] = useState({firstName: "", lastName: "", address: "", phone: "", location:{name:""}})

  const getEmployee = () => {
    DataManager.get("employees", `${props.employeeId}/?_expand=location`)
    .then(employeeFromDatabase => setEmployee(employeeFromDatabase))
  }
  useEffect(getEmployee, [])

  const deleteEmployee = () => {
    DataManager.delete("employees", props.employeeId)
    .then(() => props.history.push("/employees"))
  }

  return (
    <div>
      <h3>Name: {employee.firstName} {employee.lastName}</h3>
      <p>Address: {employee.address}</p>
      <p>Phone Number: {employee.phone}</p>
      <p>Work Location: {employee.location.name}</p>
      {(JSON.parse(sessionStorage.getItem('user')).isSupervisor ? <button onClick={deleteEmployee}>Fire Employee</button> : null)}
    </div>
  )
}

export default EmployeeDetails