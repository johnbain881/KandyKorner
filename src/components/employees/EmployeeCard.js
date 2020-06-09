import React from 'react'


const EmployeeCard = (props) => {
  return (
    <div className="card">
      <h3>Employee: {props.firstName} {props.lastName}</h3>
      {/* <p>Phone Number: {props.phone}</p> */}
      <button onClick={() => props.history.push(`/employees/${props.id}/`)}>Details</button>
    </div>
  )
}

export default EmployeeCard