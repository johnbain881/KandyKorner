import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'
import LocationCard from './LocationCard'


const ProductList = (props) => {
  
  const [locations, setLocations] = useState([])

  const getLocations = () => {
    DataManager.get('locations')
    .then(locationsFromDataBase => setLocations(locationsFromDataBase))
  }

  useEffect(getLocations, [])

  return (
    <>
      <div className="card-container">
        {locations.map(location => 
          <LocationCard key={location.id} {...props} {...location} />
        )}
      </div>
    </>
  )
}

export default ProductList