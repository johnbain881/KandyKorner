import React, { useState, useEffect } from 'react'
import DataManager from '../../modules/DataManager'


const ProductForm = (props) => {

  const [product, setProduct] = useState({name: "", price: "", productTypeId: ""})
  const [productTypes, setProductTypes] = useState([])
  const [locations, setLocations] = useState([])
  const [locationIds, setLocationIds] = useState([])
  
  const updateProduct = (evt) => {
    const stateToChange = {...product};
    let targetValue = evt.target.value
    if (/^\d+$/.test(targetValue)){
      targetValue = parseInt(targetValue)
    }
    stateToChange[evt.target.id] = targetValue;
    setProduct(stateToChange)
  }

  const updateProductLocation = (evt) => {
    let newLocationIds = locationIds;
    let targetValue = evt.target.value
    if (/^\d+$/.test(targetValue)){
      targetValue = parseInt(targetValue)
    }
    if (evt.target.checked) {
      newLocationIds.push(targetValue)
    } else {
      const isValue = (element) => element === targetValue;
      newLocationIds.splice(newLocationIds.findIndex(isValue), 1)
    }
    setLocationIds(newLocationIds)
  }

  const handleProduct = () => {
    if (product.name === "" || product.price === "" || product.productTypeId === "" || locationIds === []) {
      alert("please fill in all forms")
    } else {
      if (sessionStorage.getItem("Edit") === null) {
        DataManager.post("products", product)
        .then(() => {
          DataManager.get("products")
          .then(products => {
            locationIds.forEach(locationId => {
              DataManager.post("productLocations", {productId: products.length, locationId: parseInt(locationId)})
            })
          })
          .then(() => props.history.push("/"))
        })
      } 
      else {
        DataManager.put("products", sessionStorage.getItem("Edit"), product)
        .then(() => {
          DataManager.get("productLocations", `?productId=${sessionStorage.getItem("Edit")}`)
          .then(productLocations => {
            let productLocationsLocationIds = productLocations.map(productLocation => productLocation.locationId)
            let productLocationsToPost = locationIds.filter(x => !productLocationsLocationIds.includes(x));
            console.log("POST", productLocationsToPost)
            productLocationsToPost.forEach(productLocation => {
              DataManager.post("productLocations", {productId: parseInt(sessionStorage.getItem("Edit")), locationId: productLocation})
            })
            let productLocationsToDelete = productLocationsLocationIds.filter(x => !locationIds.includes(x));
            console.log("DELETE", productLocationsToDelete)
            let newProductLocationsToDelete = productLocations.filter(productLocation => {
              if (productLocationsToDelete.includes(productLocation.locationId)) {
                return productLocation.id
              }
            })
            newProductLocationsToDelete.forEach(productLocation => {
              DataManager.delete("productLocations", productLocation.id)
            })
          })
          .then(() => {
            sessionStorage.removeItem("Edit")
            props.history.push("/")
          })
        })
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("Edit")) {
      const getProduct = () => {
        DataManager.get("products", `${sessionStorage.getItem("Edit")}?_expand=productType&_embed=productLocations`)
        .then(productFromDatabase => {
            let prefilledValues = {
              name: productFromDatabase.name,
              price: productFromDatabase.price,
              productTypeId: productFromDatabase.productTypeId
            }
            setProduct(prefilledValues)
            let prefilledLocationIds = productFromDatabase.productLocations.map((productLocation => productLocation.locationId))
            setLocationIds(prefilledLocationIds)
          })
        }
        getProduct()
    }
  }, [])

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


  return (
    <>
      <input onChange={updateProduct} placeholder="Product Name" id="name" type="text" value={product.name}></input>
      <label htmlFor="name">Product Name</label>
      <input onChange={updateProduct} placeholder="Product Price" id="price" type="number" value={product.price}></input>
      <label htmlFor="price">Product Price</label>
      <select id="productTypeId" onChange={updateProduct}>
        <option key="0" value="">Please select a Product Type</option>
        {productTypes.map(productType => <option selected={productType.id === product.productTypeId? "selected" : null} key={productType.id} value={productType.id}>{productType.name}</option>)}
      </select>
      <label htmlFor="productTypeId">Product Type</label>
      <div>
        {locations.map(location => 
        <>
          <input onChange={updateProductLocation} defaultChecked={locationIds.includes(location.id)} id={location.id} type="checkbox" value={location.id} name={location.name}/> 
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