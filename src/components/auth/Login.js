import React, { useState } from 'react'
import { Input, Label, Button, Alert } from 'reactstrap'
import DataManager from '../../modules/DataManager'


const Login = (props) => {
  let [user, setUser] = useState({username: "", password: "", isSupervisor: false})
  
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
          if (employee[0].isSupervisor) {
            const stateToChange = {...user};
            stateToChange.isSupervisor = true
            props.setUser(stateToChange)
          } else {
            props.setUser(user)
          }
        }
      } else {
        alert("Invalid username")
      }
    })
  }


  return (
    <>
      <Input onChange={updateCredentials} id="username" placeholder="Username" type="text"></Input>
      <Label htmlFor="username">Username</Label>
      <Input onChange={updateCredentials} id="password" placeholder="Password" type="password"></Input>
      <Label htmlFor="password">Password</Label>
      <Button onClick={handleLogin}>Submit</Button>
    </>
  )
}

export default Login