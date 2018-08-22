import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {}
	};

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	onSubmit = async (dispatch, event) => {
		event.preventDefault();
		const { name, email, phone } = this.state;

		if (name === '') {
			this.setState({
				errors: { name: 'Name is required' }
			});
		}
		else if (email === '') {
			this.setState({
				errors: { email: 'Email is required' }
			});
		}
		else if (phone === '') {
			this.setState({
				errors: { phone: 'Phone is required' }
			});
		}
		else {
			const res = await axios.post('https://jsonplaceholder.typicode.com/users/', this.state);
			dispatch({ type: 'ADD_CONTACT', payload: res.data });

			this.setState({
				name: '',
				email: '',
				phone: '',
				errors: {}
			});
		}

		this.props.history.push('/');
	};

	render() {
		const { name, email, phone, errors } = this.state;

		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card mb-3">
							<div className="card-header">
								Add Contact
							</div>
							<div className="card-body">
								<form onSubmit={this.onSubmit.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter Name..."
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextInputGroup
										label="Email"
										name="email"
										placeholder="Enter Email..."
										value={email}
										type="email"
										onChange={this.onChange}
										error={errors.email}
									/>
									<TextInputGroup
										label="Phone"
										name="phone"
										placeholder="Enter Phone..."
										value={phone}
										onChange={this.onChange}
										error={errors.phone}
									/>
									<input
										type="submit"
										value="Add Contact"
										className="btn btn-light btn-block"
									/>
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default AddContact;