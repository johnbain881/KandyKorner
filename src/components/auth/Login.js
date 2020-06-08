import React, { useState } from 'react'
import DataManager from '../../modules/DataManager'


const Login = (props) => {
  let [user, setUser] = useState({username:"", password:""})
  
  const updateCredentials = (evt) => {
    const stateToChange = {...user};
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange)
  }

  const handleLogin = () => {
    DataManager.getEmployeeByName(user.username)
    .then(employee => {
      if (employee[0]) {
        if (employee[0].password !== user.password) {
          alert("Invalid password")
        } else {
          props.setUser(user)
        }
      } else {
        alert("Invalid username")
      }
    })
  }


  return (
    <>
      <input onChange={updateCredentials} id="username" placeholder="Username" type="text"></input>
      <label htmlFor="username">Username</label>
      <input onChange={updateCredentials} id="password" placeholder="Password" type="password"></input>
      <label htmlFor="password">Password</label>
      <button onClick={handleLogin}>Submit</button>
    </>
  )
}

export default Login