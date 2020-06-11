import React from 'react'
import { Button } from 'reactstrap'


const ProductCard = (props) => {
  return (
    <div className="card">
      <h3>Product: {props.name}</h3>
      <p>Price: {props.price}</p>
      <div>
      <Button onClick={() => props.history.push(`/products/${props.id}`)}>Details</Button>
      </div>
    </div>
  )
}

export default ProductCard