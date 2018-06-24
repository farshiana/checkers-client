import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	setLoading,
	acceptReceivedFriendRequest,
	deleteReceivedFriendRequest,
} from '../../../store/actions/index';

class RecievedFriendRequest extends Component {
	state = {
		acceptDialog: false,
		rejectDialog: false,
	}

	acceptDialogHandler = () => {
		this.setState({ acceptDialog: !this.state.acceptDialog });
	}

	acceptHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onAcceptReceivedFriendRequest(this.props.request);
		this.acceptDialogHandler();
		this.props.onSetLoading(false);
	}

	rejectDialogHandler = () => {
		this.setState({ rejectDialog: !this.state.rejectDialog });
	}

	rejectHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onDeleteReceivedFriendRequest(this.props.request);
		this.rejectDialogHandler();
		this.props.onSetLoading(false);
	}

	render = () => (
		<Fragment>
			<ListItem>
				<ListItemText inset primary={this.props.request.source.username} />
				<IconButton onClick={this.acceptDialogHandler}>
					<CheckIcon color="primary" />
				</IconButton>
				<IconButton onClick={this.rejectDialogHandler}>
					<CloseIcon color="secondary" />
				</IconButton>
			</ListItem>
			<Dialog
				open={this.state.acceptDialog}
				onClose={this.acceptDialogHandler}
			>
				<DialogTitle>{`Accept friend request from ${this.props.request.source.username}?`}</DialogTitle>
				<DialogActions>
					<Button onClick={this.acceptDialogHandler} color="secondary">
						Cancel
					</Button>
					<Button onClick={this.acceptHandler} color="primary" autoFocus>
						Validate
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={this.state.rejectDialog}
				onClose={this.rejectDialogHandler}
			>
				<DialogTitle>{`Reject friend request from ${this.props.request.source.username}?`}</DialogTitle>
				<DialogActions>
					<Button onClick={this.rejectDialogHandler} color="secondary">
						Cancel
					</Button>
					<Button onClick={this.rejectHandler} color="primary" autoFocus>
						Validate
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onAcceptReceivedFriendRequest: request => dispatch(acceptReceivedFriendRequest(request)),
	onDeleteReceivedFriendRequest: request => dispatch(deleteReceivedFriendRequest(request)),
});

export default connect(null, mapDispatchToProps)(RecievedFriendRequest);
