import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import HistoryIcon from '@material-ui/icons/History';

import './PreviousGames.css';
import {
	setLoading,
	getPreviousGames,
} from '../../store/actions/index';
import PreviousGame from './PreviousGame/PreviousGame';
import ListElt from '../UI/List/List';

class PreviousGames extends Component {
	async componentWillMount() {
		this.props.onSetLoading(true);
		await this.props.onGetPreviousGames();
		this.props.onSetLoading(false);
	}

	render() {
		const previousGames = this.props.previousGames.map((previousGame) => (
			<PreviousGame key={previousGame._id} game={previousGame} />
		));

		return (
			<div className="PreviousGames">
				<List component="nav">
					<ListElt
						title="Previous Games"
						items={previousGames}
						open={true}
						icon={<HistoryIcon className="PrimaryIcon" />}
					/>
				</List>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	previousGames: state.game.previousGames,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onGetPreviousGames: () => dispatch(getPreviousGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviousGames);
