import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import Login from './auth/Login'
import NavBar from './nav/NavBar'
import ProductList from './products/ProductList'
import EmployeeList from './employees/EmployeeList'
import LocationList from './locations/LocationList'
import EmployeeDetails from './employees/EmployeeDetails'
import ProductDetails from './products/ProductDetails'
import ProductForm from './products/ProductForm'

const ApplicationViews = (props) => {
  const isAuthenticated = () => {
    return sessionStorage.getItem('user') !== null ? true : false
  }

  let [hasUser, setHasUser] = useState(isAuthenticated())

  const setUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  }

  useEffect(() => {
  }, [hasUser])
  
  if (!hasUser) {
    return (
      <Login setUser={setUser} />
      )
  } else {
    return (
      <>
        <NavBar clearUser={clearUser} />
        <Route
          exact
          path="/"
          render={props => {
            return <ProductList {...props} />
          }}
        />
        <Route
          exact
          path="/products/:productId(\d+)"
          render={props => {
            return <ProductDetails productId={parseInt(props.match.params.productId)} {...props} />
          }}
        />
        <Route
          exact
          path="/products/add"
          render={props => {
            return <ProductForm {...props} />
          }}
        />
        <Route
          exact
          path="/locations"
          render={props => {
            return <LocationList {...props} />
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            return <EmployeeList {...props} />
          }}
        />
        <Route
          exact
          path="/employees/:employeeId(\d+)"
          render={props => {
            return <EmployeeDetails employeeId={parseInt(props.match.params.employeeId)} {...props} />
          }}
        />
      </>
    )
  }
}

export default ApplicationViews