import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import CasinoIcon from '@material-ui/icons/Casino';
import { connect } from 'react-redux';

import './Home.css';
import {
	setLoading,
	getGames,
	getPreviousGames,
	getSentGameInvites,
	getReceivedGameInvites,
	getReceivedFriendRequests,
} from '../../store/actions/index';
import Game from './Game/Game';
import ReceivedGameInvite from './ReceivedGameInvite/ReceivedGameInvite';
import SentGameInvite from './SentGameInvite/SentGameInvite';
import ListElt from '../UI/List/List';
import ReceivedFriendRequest from '../Friends/ReceivedFriendRequest/ReceivedFriendRequest';

class Home extends Component {
	async componentWillMount() {
		this.props.onSetLoading(true);
		await Promise.all([
			this.props.onGetGames(),
			this.props.onGetPreviousGames(),
			this.props.onGetSentGameInvites(),
			this.props.onGetReceivedGameInvites(),
			this.props.onGetReceivedFriendRequests(),
		]);
		this.props.onSetLoading(false);
	}

	render() {
		const games = this.props.games.map((game) => (
			<Game key={game._id} game={game} />
		));
		const gamesList = games.length > 0
			? <ListElt
				title="Current Games"
				items={games}
				icon={<CasinoIcon className="PrimaryIcon" />}
			/>
			: null;

		const sentGameInvites = this.props.sentGameInvites.map((sentGameInvite) => (
			<SentGameInvite key={sentGameInvite._id} invite={sentGameInvite} />
		));
		const sentGameInvitesList = sentGameInvites.length > 0
			? <ListElt
				title="Sent Game Invites"
				items={sentGameInvites}
				icon={<DraftsIcon className="PrimaryIcon" />}
			/>
			: null;

		const receivedGameInvites = this.props.receivedGameInvites.map((receivedGameInvite) => (
			<ReceivedGameInvite key={receivedGameInvite._id} invite={receivedGameInvite} />
		));
		const receivedGameInvitesList = receivedGameInvites.length > 0
			? <ListElt
				title="Received Game Invites"
				items={receivedGameInvites}
				icon={<EmailIcon className="PrimaryIcon" />}
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

		let previousGames = (
			<ListItem button component={Link} to="/previousgames">
				<ListItemIcon>
					<HistoryIcon className="PrimaryIcon" />
				</ListItemIcon>
				<ListItemText inset primary="Previous Games" />
			</ListItem>
		);
		if (this.props.previousGames.length === 0) {
			previousGames = null;
		}

		return (
			<div className="Home">
				<List component="nav">
					<ListItem button component={Link} to="/newgame">
						<ListItemIcon>
							<AddCircleIcon className="PrimaryIcon" />
						</ListItemIcon>
						<ListItemText inset primary="New Game" />
					</ListItem>
					{gamesList}
					{receivedGameInvitesList}
					{sentGameInvitesList}
					{receivedFriendRequestsList}
					{previousGames}
				</List>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	receivedFriendRequests: state.friendship.receivedFriendRequests,
	games: state.game.games,
	sentGameInvites: state.game.sentGameInvites,
	receivedGameInvites: state.game.receivedGameInvites,
	previousGames: state.game.previousGames,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onGetGames: () => dispatch(getGames()),
	onGetSentGameInvites: () => dispatch(getSentGameInvites()),
	onGetReceivedGameInvites: () => dispatch(getReceivedGameInvites()),
	onGetReceivedFriendRequests: () => dispatch(getReceivedFriendRequests()),
	onGetPreviousGames: () => dispatch(getPreviousGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
