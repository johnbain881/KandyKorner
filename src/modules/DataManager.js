const url = "http://localhost:8088"

export default {
  get: (resource, id="") => {
    return fetch(`${url}/${resource}/${id}`)
    .then(response => response.json())
  },
  getEmployeeByName: (name) => {
    return fetch(`${url}/employees/?username=${name}`)
    .then(response => response.json())
  } 
}