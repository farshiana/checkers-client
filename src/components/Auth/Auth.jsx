import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-form-validator-core';

import './Auth.css';
import InputValidator from '../UI/InputValidator/InputValidator';
import {
	setLoading,
	auth,
} from '../../store/actions/index';

class Auth extends Component {
	state = {
		signinMode: true,
		username: '',
		password: '',
		repeatPassword: '',
	}

	componentWillMount() {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			return value === this.state.password;
		});
	}

	changeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	submitHandler = async () => {
		this.props.onSetLoading(true);
		this.props.onAuth(this.state.username, this.state.password, this.state.signinMode);
		this.props.onSetLoading(false);
	}

	switchModeHandler = () => {
		this.setState({ signinMode: !this.state.signinMode });
	}

	render() {
		let confirmPassword = null;
		let switchMode = (
			<Fragment>
				<span>You don't have an account?</span>
				<Button onClick={this.switchModeHandler}>Sign Up</Button>
			</Fragment>
		);
		let submitText = 'Signin';

		if (!this.state.signinMode) {
			confirmPassword = (
				<InputValidator
					label="Password Confirmation"
					type="password"
					name="repeatPassword"
					value={this.state.repeatPassword}
					onChange={this.changeHandler.bind(this)}
					placeholder="Enter password confirmation"
					validators={['required', 'isPasswordMatch']}
					errorMessages={['Password confirmation is required', 'Passwords don\'t match']}
				/>
			);
			switchMode = (
				<Fragment>
					<span>Already have an account?</span>
					<Button onClick={this.switchModeHandler}>Sign In</Button>
				</Fragment>
			);
			submitText = 'Signup';
		}

		return (
			<div className="Auth">
				<div className="Wrapper">
					<ValidatorForm onSubmit={this.submitHandler} instantValidate={false} >
						<InputValidator
							label="Username"
							name="username"
							value={this.state.username}
							onChange={this.changeHandler.bind(this)}
							placeholder="Enter username"
							validators={['required']}
							errorMessages={['Username is required']}
						/>
						<InputValidator
							label="Password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.changeHandler.bind(this)}
							placeholder="Enter password"
							validators={['required']}
							errorMessages={['Password is required']}
						/>
						{confirmPassword}
						<Button variant="raised" type="submit">{submitText}</Button>
					</ValidatorForm>
					<div className="Switch">
						{switchMode}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onAuth: (email, password, signinMode) => dispatch(auth(email, password, signinMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
