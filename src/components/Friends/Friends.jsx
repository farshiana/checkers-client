import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux';

import './Friends.css';
import {
	setLoading,
	getFriendships,
	getSentFriendRequests,
	getReceivedFriendRequests,
} from '../../store/actions/index';
import Friendship from './Friendship/Friendship';
import ReceivedFriendRequest from './ReceivedFriendRequest/ReceivedFriendRequest';
import SentFriendRequest from './SentFriendRequest/SentFriendRequest';
import AddFriend from './AddFriend/AddFriend';
import ListElt from '../UI/List/List';

class Friends extends Component {
	state = {
		addFriendDialog: false,
	}

	async componentWillMount() {
		this.props.onSetLoading(true);
		await Promise.all([
			this.props.onGetFriendships(),
			this.props.onGetSentFriendRequests(),
			this.props.onGetReceivedFriendRequests(),
		]);
		this.props.onSetLoading(false);
	}

	addFriendDialogHandler = (addFriendDialog) => {
		this.setState({ addFriendDialog });
	}

	render() {
		const friendships = this.props.friendships.map((friendship) => (
			<Friendship key={friendship._id} friendship={friendship} />
		));
		const friendshipsList = friendships.length > 0
			? <ListElt
				title="My friends"
				items={friendships}
				icon={<PeopleIcon className="PrimaryIcon" />}
			/>
			: null;

		const sentFriendRequests = this.props.sentFriendRequests.map((sentFriendRequest) => (
			<SentFriendRequest key={sentFriendRequest._id} request={sentFriendRequest} />
		));
		const sentFriendRequestsList = sentFriendRequests.length > 0
			? <ListElt
				title="Sent Friend Requests"
				items={sentFriendRequests}
				icon={<DraftsIcon className="PrimaryIcon" />}
			/>
			: null;

		const receivedFriendRequests = this.props.receivedFriendRequests.map((receivedFriendRequest) => (
			<ReceivedFriendRequest key={receivedFriendRequest._id} request={receivedFriendRequest} />
		));
		const receivedFriendRequestsList = receivedFriendRequests.length > 0
			? <ListElt
				title="Received Friend Requests"
				items={receivedFriendRequests}
				icon={<EmailIcon className="PrimaryIcon" />}
			/>
			: null;

		return (
			<div className="Friends">
				<AddFriend
					open={this.state.addFriendDialog}
					closeHandler={() => this.addFriendDialogHandler(false)}
				/>
				<div>
					<List component="nav">
						<ListItem button onClick={() => this.addFriendDialogHandler(true)}>
							<ListItemIcon>
								<AddCircleIcon className="PrimaryIcon" />
							</ListItemIcon>
							<ListItemText inset primary="New Friend" />
						</ListItem>
						{friendshipsList}
						{receivedFriendRequestsList}
						{sentFriendRequestsList}
					</List>
				</div>
				{/* <div>Previous Games</div> */}
			</div>
		);
	}
};

const mapStateToProps = state => ({
	friendships: state.friendship.friendships,
	sentFriendRequests: state.friendship.sentFriendRequests,
	receivedFriendRequests: state.friendship.receivedFriendRequests,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onGetFriendships: () => dispatch(getFriendships()),
	onGetSentFriendRequests: () => dispatch(getSentFriendRequests()),
	onGetReceivedFriendRequests: () => dispatch(getReceivedFriendRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
