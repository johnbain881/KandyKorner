import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  return (
    <Nav>
      <NavItem>
        <NavLink className='nav-link' href='/' onClick={props.clearUser}>Logout</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className='nav-link' href='/'>Products</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className='nav-link' href='/employees'>Employees</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className='nav-link' href='/locations'>Locations</NavLink>
      </NavItem>
    </Nav>
  )
}

export default NavBar