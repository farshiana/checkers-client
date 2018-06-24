import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
	setLoading,
	sendGameInvite,
} from '../../../store/actions/index';

class Friendship extends Component {
	state = {
		username: this.props.friendship.source ? this.props.friendship.source.username
			: this.props.friendship.target.username,
		inviteDialog: false,
	}

	inviteDialogHandler = ( inviteDialog) => {
		this.setState({ inviteDialog });
	}

	sendInviteHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onSendGameInvite(
			this.props.friendship.source ? this.props.friendship.source._id
				: this.props.friendship.target._id,
			this.state.username,
		);
		this.props.onSetLoading(false);
		this.props.history.push('/home');
	}

	render() {
		return (
			<Fragment>
				<Dialog
					open={this.state.inviteDialog}
					onClose={() => this.inviteDialogHandler(false)}
				>
					<DialogTitle>{`Play against ${this.state.username}?`}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							A game request will be sent to {this.state.username}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.inviteDialogHandler(false)} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.sendInviteHandler} color="primary" autoFocus>
							Validate
						</Button>
					</DialogActions>
				</Dialog>
				<ListItem button onClick={() => this.inviteDialogHandler(true)}>
					{/* <ListItemIcon>
						<AddCircle className="PrimaryIcon" />
					</ListItemIcon> */}
					<ListItemText inset primary={this.state.username} />
				</ListItem>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onSendGameInvite: (userid, username) => dispatch(sendGameInvite(userid, username)),
});

export default connect(null, mapDispatchToProps)(withRouter(Friendship));
