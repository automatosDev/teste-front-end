
const api = "https://reqres.in/api"

const headers = {
  'Accept': 'application/json',
}

export const getUsersByPage = (page) =>
  fetch(`${api}/users?page=${page}`, { headers })
    .then(res => res.json())
    .then(data => data.data)

export const getStarted = () =>
    fetch(`${api}/users?page=1`, { headers })
      .then(res => res.json())
      .then(data => { return  {cards :data.data, pages: data.total_pages} } )

export const postUser = (user) => 
    fetch(`${api}/users`, {
        method:'post',
        body: JSON.stringify(user),
        headers
      })
        .then(response => response.json())