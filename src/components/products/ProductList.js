import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'
import ProductCard from './ProductCard'


const ProductList = (props) => {
  
  const [products, setProducts] = useState([])

  const getProducts = () => {
    DataManager.get('products')
    .then(productsFromDatabase => setProducts(productsFromDatabase))
  }

  useEffect(getProducts, [])

  return (
    <>
      <button onClick={() => props.history.push("/products/add")}>Add a new product!</button>
      <div className="card-container">
        {products.map(product => 
          <ProductCard key={product.id} {...props} {...product} />
        )}
      </div>
    </>
  )
}

export default ProductList