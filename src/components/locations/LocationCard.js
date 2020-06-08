import React from 'react'


const LocationCard = (props) => {
  return (
    <div className="card">
      <h3>Location: {props.name}</h3>
      <p>Address: {props.address}</p>
      <button onClick={() => props.history.push(`/locations/${props.id}/`)}>Details</button>
    </div>
  )
}

export default LocationCard