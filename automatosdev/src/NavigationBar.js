import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NavigationBar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			page: ''
		}
	}

	static propTypes = {
		previousPage: PropTypes.func.isRequired,
		nextPage: PropTypes.func.isRequired
	}

	render() {
		const { previousPage, nextPage } = this.props

		return (
			<div className='navigatioBar'>
			<a href='javascript:void(0)' className='fas arrow fa-angle-left fa-2x' onClick={previousPage}></a>
			<a href='javascript:void(0)' className='fas arrow fa-angle-right fa-2x' onClick={nextPage}></a>
			</div>
			)
	}

}

export default NavigationBar