import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <>
      <Link className='nav-link' to='/' onClick={props.clearUser}>Logout</Link>
      <Link className='nav-link' to='/'>Products</Link>
      <Link className='nav-link' to='/employees'>Employees</Link>
      <Link className='nav-link' to='/locations'>Locations</Link>
    </>
  )
}

export default NavBar