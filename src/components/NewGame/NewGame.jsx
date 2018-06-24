import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import DraftsIcon from '@material-ui/icons/Drafts';

import './NewGame.css';
import Friendship from './Friendship/Friendship';
import {
	setLoading,
	getFriendships,
} from '../../store/actions/index';
import ListElt from '../UI/List/List';

class NewGame extends Component {
	async componentWillMount() {
		this.props.onSetLoading(true);
		await this.props.onGetFriendships();
		this.props.onSetLoading(false);
	}

	render(){
		const friendships = this.props.friendships.map((friendship) => (
			<Friendship key={friendship._id} friendship={friendship} />
		));
		const friendshipsList = friendships.length > 0
			? <ListElt
				title="Play against a friend"
				items={friendships}
				open={true}
				icon={<DraftsIcon className="PrimaryIcon" />}
			/>
			: null;

		return (
			<div className="NewGame">
				<div>
					<List component="nav">
						<ListItem button>
							{/* <ListItemIcon>
								<AddCircle className="PrimaryIcon" />
							</ListItemIcon> */}
							<ListItemText inset primary="Play Offline" />
						</ListItem>
						{friendshipsList}
					</List>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	friendships: state.friendship.friendships,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onGetFriendships: () => dispatch(getFriendships()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
