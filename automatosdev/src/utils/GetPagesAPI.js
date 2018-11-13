const api = 'https://reqres.in/api/users';

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

export const getFirstPage = () =>
fetch(`${api}`, { headers })
.then(response => response.json())

export const getPage = (page) =>
fetch(`${api}/?page=${page}`, { headers })
.then(response => response.json())

export const createUser = (userData) =>
fetch(`${api}`, {
	method: 'POST',
	headers: {	
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		name: userData.name,
		job: userData.job,
	})
}).then(response => response.json())