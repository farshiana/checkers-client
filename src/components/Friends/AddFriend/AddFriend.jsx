import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-form-validator-core';

import {
	setLoading,
	sendFriendRequest,
} from '../../../store/actions/index';
import InputValidator from '../../UI/InputValidator/InputValidator';

class AddFriend extends Component {
	state = {
		username: '',
	}

	changeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	submitHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onSendFriendRequest(this.state.username);
		this.props.onSetLoading(false);
		this.props.closeHandler();
	}

	render = () => (
		<Dialog
			open={this.props.open}
			onClose={this.props.closeHandler}
		>
			<ValidatorForm onSubmit={this.submitHandler} >
				<DialogTitle>Friend Request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To send a new friend request, please enter your friend's username
					</DialogContentText>
					<InputValidator
						label="Username"
						name="username"
						value={this.state.username}
						onChange={this.changeHandler}
						placeholder="Enter username"
						validators={['required']}
						errorMessages={['Username is required']}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.closeHandler} color="secondary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Send
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	)
};

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onSendFriendRequest: (username) => dispatch(sendFriendRequest(username)),
});

export default connect(null, mapDispatchToProps)(AddFriend);
