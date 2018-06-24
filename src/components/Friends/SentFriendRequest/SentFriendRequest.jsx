import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	setLoading,
	deleteSentFriendRequest,
} from '../../../store/actions/index';

class SentFriendRequest extends Component {
	state = {
		deleteDialog: false,
	}

	deleteDialogHandler = () => {
		this.setState({ deleteDialog: !this.state.deleteDialog });
	}

	deleteHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onDeleteSentFriendRequest(this.props.request);
		this.deleteDialogHandler();
		this.props.onSetLoading(false);
	}

	render = () => (
		<Fragment>
			<ListItem>
				<ListItemText inset primary={this.props.request.target.username} />
				<IconButton onClick={this.deleteDialogHandler}>
					<CloseIcon color="secondary" />
				</IconButton>
			</ListItem>
			<Dialog
				open={this.state.deleteDialog}
				onClose={this.deleteDialogHandler}
			>
				<DialogTitle>{`Cancel friend request to ${this.props.request.target.username}?`}</DialogTitle>
				<DialogActions>
					<Button onClick={this.deleteDialogHandler} color="secondary">
						Cancel
					</Button>
					<Button onClick={this.deleteHandler} color="primary" autoFocus>
						Validate
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onDeleteSentFriendRequest: request => dispatch(deleteSentFriendRequest(request)),
});

export default connect(null, mapDispatchToProps)(SentFriendRequest);
