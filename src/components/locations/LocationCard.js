import React from 'react'


const LocationCard = (props) => {
  return (
    <div className="card">
      <h3>Location: {props.name}</h3>
      <p>Address: {props.address}</p>
    </div>
  )
}

export default LocationCard