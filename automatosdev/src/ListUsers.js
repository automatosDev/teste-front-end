import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ListUsers extends Component {

	constructor(props) {
		super(props);

		this.state = {
			page: ''
		}
	}

	static propTypes = {
		users: PropTypes.array.isRequired
	}

	render() {
		const { users } = this.props
		let showingUsers = users

		return (
			<div className='list-users'>
			<ul className='users-list'>
			{showingUsers.map((user) => (
				<li key={user.id} className='contact-list-item'>
				<div className='user-avatar' style={{
					backgroundImage: `url(${user.avatar})`
				}}/>
				<div className="user-details">
				<h3>{user.first_name}</h3>
				<h3>{user.last_name}</h3>
				</div>
				</li>
				))
		}
		</ul>
		</div>
		)
	}
}

export default ListUsers
