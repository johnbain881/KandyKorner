import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
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
      <Button onClick={() => props.history.push("/products/add")}>Add a new product!</Button>
      <div className="card-container">
        {products.map(product => 
          <ProductCard key={product.id} {...props} {...product} />
        )}
      </div>
    </>
  )
}

export default ProductList