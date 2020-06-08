import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import Login from './auth/Login'
import NavBar from './nav/NavBar'
import ProductList from './products/ProductList'
import EmployeeList from './employees/EmployeeList'
import LocationList from './locations/LocationList'

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
    console.log("Redirect!")
  }, [hasUser])
  
  if (!hasUser) {
    console.log("We don't have a user!")
    return (
      <Login setUser={setUser} />
      )
  } else {
    return (
      <>
        <NavBar clearUser={clearUser} />
        <Route
          exact
          path="/products"
          render={props => {
            return <ProductList {...props} />
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
      </>
    )
  }
}

export default ApplicationViews