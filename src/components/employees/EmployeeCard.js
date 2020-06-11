import React from 'react'
import { Button } from 'reactstrap'


const EmployeeCard = (props) => {
  function getEmployeeDetails() {
    props.history.push(`/employees/${props.id}/`)
  }
  return (
    <div className="card">
      <h3>Employee: {props.firstName} {props.lastName}</h3>
      {/* <p>Phone Number: {props.phone}</p> */}
      <div>

      <Button onClick={getEmployeeDetails}>Details</Button>
      </div>
    </div>
  )
}

export default EmployeeCard