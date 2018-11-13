import React, { Component } from 'react'

class CreateUser extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { createUser } = this.props

		return (
			<div className='create-user'>
			<form onSubmit={createUser}>
				<input type='text' name='name' placeholder='Nome'></input>
				<input type='text' name='job' placeholder='Profissão'></input>
				<button type='submit'>Adicionar</button>
			</form>
			</div>
		)
	}
}


export default CreateUser;