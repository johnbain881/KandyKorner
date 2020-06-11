const url = "http://localhost:8088"

export default {
  get: (resource, id="") => {
    return fetch(`${url}/${resource}/${id}`)
    .then(response => response.json())
  },
  getEmployeeByName: (name) => {
    return fetch(`${url}/employees/?username=${name}`)
    .then(response => response.json())
  },
  post: (resource, data ) => {
    return fetch(`${url}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },
  put: (resource, id, data) => {
    return fetch(`${url}/${resource}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },
  delete: (resource, id) => {
    return fetch(`${url}/${resource}/${id}`, {
      method: 'DELETE',
    })
  }
}