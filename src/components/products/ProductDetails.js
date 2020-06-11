import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import DataManager from '../../modules/DataManager'


const ProductDetails = (props) => {
  const [product, setProduct] = useState({name: "", price: "", id: "", productType:{id: "", name:""}, locations: []})

  useEffect(() => {
    const getProduct = () => {
      DataManager.get("products", `${props.productId}?_expand=productType&_embed=productLocations`)
        .then(productFromDatabase => {
            DataManager.get("productLocations", `?productId=${productFromDatabase.id}&_expand=location`)
            .then(locations => {
              productFromDatabase.locations = locations.map(location => location.location)
              setProduct(productFromDatabase)
            })
        })
      }
    getProduct()
  }, [props.productId])

  const handleEdit = () => {
    sessionStorage.setItem("Edit", props.productId)
    props.history.push("/products/add")
  }

  return (
    <div>
      <h3>Product: {product.name}</h3>
      <p>Type: {product.productType.name}</p>
      <p>Locations:</p>
      <ul>
        {product.locations.map(location => <li key={location.id}>{location.name}</li>)}
      </ul>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  )
}

export default ProductDetails