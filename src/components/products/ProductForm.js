import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'


const ProductForm = () => {

  const [product, setProduct] = useState({name: "", price: "", productTypeId: ""})
  const [productTypes, setProductTypes] = useState([])
  const [locations, setLocations] = useState([])
  const locationIds = []

  const updateProduct = (evt) => {
    const stateToChange = {...product};
    stateToChange[evt.target.id] = evt.target.value;
    setProduct(stateToChange)
  }

  const updateProductLocation = (evt) => {
    if (evt.target.checked) {
      locationIds.push(evt.target.value)
    } else {
      const isValue = (element) => element === evt.target.value;
      locationIds.splice(locationIds.findIndex(isValue), 1)
    }
  }

  useEffect(() => {
    const getProductTypes = () => {
      DataManager.get("productTypes")
      .then(productTypesFromDatabase => setProductTypes(productTypesFromDatabase))
    }
    getProductTypes();
  }, [])

    useEffect(() => {
      const getLocations = () => {
        DataManager.get("locations")
        .then(locationsFromDatabase => setLocations(locationsFromDatabase))
      }
      getLocations()
    }, [])

    const handleProduct = () => {
      DataManager.post("products", product)
      .then(() => {
        DataManager.get("products")
        .then(products => {
          locationIds.forEach(locationId => {
            DataManager.post("productLocations", {productId: products.length, locationId: locationId})
          })
        })
      })

    }

  return (
    <>
      <input onChange={updateProduct} placeholder="Product Name" id="name" type="text"></input>
      <label htmlFor="name">Product Name</label>
      <input onChange={updateProduct} placeholder="Product Price" id="price" type="number"></input>
      <label htmlFor="price">Product Price</label>
      <select id="productTypeId" onChange={updateProduct}>
        <option key="0" value="">Please select a Product Type</option>
        {productTypes.map(productType => <option key={productType.id} value={productType.id}>{productType.name}</option>)}
      </select>
      <label htmlFor="productTypeId">Product Type</label>
      <div>
        {locations.map(location => 
        <>
          <input onChange={updateProductLocation} id={location.id} type="checkbox" value={location.id} name={location.name}/> 
          <label htmlFor={location.id}>{location.name}</label>
        </>
        )}
      </div>
      

      <button onClick={handleProduct}>Add New Candy</button>
    </>
  )
}

export default ProductForm

// Product
// {
//   "id": 1,
//   "name": "Pink Gummy Bears",
//   "price": "3.99",
//   "productTypeId": 2
// },

// ProductType
// {
//   "id": 1,
//   "name": "Chocolate"
// },

// ProductLocation
// {
//   "id": 1,
//   "productId": 1,
//   "locationId": 2
// },

// Location
// {
//   "id": 1,
//   "name": "Kandy Korner Kidz",
//   "address": "202 Success Circle, Nashville, TN",
//   "phone": "154-7622"
// },