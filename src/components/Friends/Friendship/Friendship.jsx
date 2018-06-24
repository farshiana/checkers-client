import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	setLoading,
	deleteFriendship,
} from '../../../store/actions/index';

class Friendship extends Component {
	state = {
		deleteDialog: false,
	}

	deleteDialogHandler = () => {
		this.setState({ deleteDialog: !this.state.deleteDialog });
	}

	deleteHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onDeleteFriendship(this.props.friendship);
		this.deleteDialogHandler();
		this.props.onSetLoading(false);
	}

	render() {
		const username = this.props.friendship.source ? this.props.friendship.source.username
			: this.props.friendship.target.username;

		return (
			<Fragment>
				<ListItem>
					<ListItemText inset primary={username} />
					<IconButton onClick={this.deleteDialogHandler}>
						<CloseIcon color="secondary" />
					</IconButton>
				</ListItem>
				<Dialog
					open={this.state.deleteDialog}
					onClose={this.deleteDialogHandler}
				>
					<DialogTitle>{`Remove ${this.state.username} from your friends?`}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You will not be able to play against {this.state.username} anymore
						</DialogContentText>
					</DialogContent>
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
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onDeleteFriendship: friendship => dispatch(deleteFriendship(friendship)),
});

export default connect(null, mapDispatchToProps)(Friendship);
