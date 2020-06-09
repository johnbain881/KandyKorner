import React from 'react'


const ProductCard = (props) => {
  return (
    <div className="card">
      <h3>Product: {props.name}</h3>
      <p>Price: {props.price}</p>
      <button onClick={() => props.history.push(`/products/${props.id}`)}>Details</button>
    </div>
  )
}

export default ProductCard