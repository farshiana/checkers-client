import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import alertify from 'alertify.js';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './Game.css';
import Board from './Board/Board';
import socketIoClient from 'socket.io-client';
import { setLoading, getGames, sendGameInvite } from '../../store/actions/index';
import { reversePieces, reverseMoves, samePosition } from '../../tools/utils';

class GameComponent extends Component {
	state = {
		socket: null,
		game: null,
		players: [],
		pieces: [],
		moves: [],
		visibleMoves: [],
		selectedPiece: null,
		winner: null,
	}

	componentWillUnmount() {
		this.state.socket.disconnect();
	}

	async componentDidMount() {
		const socket = socketIoClient(process.env.REACT_APP_API);
		this.setState({ socket });

		this.props.onSetLoading(true);
		await this.props.onGetGames();
		this.props.onSetLoading(false);

		const gameId = this.props.match.params.gameId;
		const game = this.props.games.find(game => game._id === gameId);
		if (!game) {
			return this.props.history.push('/home');
		}
		this.setState({ game });

		socket.on('players', (players) => {
			console.log(`Received ${players.length} players`);
			this.setState({ players });
		});

		socket.on('errorMessage', (error) => {
			console.error(`Received an error: ${error}`);
			alertify.error(error);
		});

		socket.on('update', (data) => {
			console.log(`Received update: ${data.pieces.length} pieces, ${data.moves.length} moves`);
			// Check if game ended
			if (data.winner) {
				this.setState({ winner: data.winner });
			}

			// Make sure moves and pieces are in the right direction
			const pieces = this.state.game.target ? data.pieces : reversePieces(game.size, data.pieces);
			const moves = this.state.game.target ? data.moves : reverseMoves(game.size, data.moves);
			this.setState({ pieces, moves });
		});

		socket.emit('join', gameId);
	}

	getChip = (username, online) => (
		<Chip
			key={username}
			avatar={
				<Avatar>
					<FaceIcon color={online ? 'primary' : 'secondary'} />
				</Avatar>
			}
			label={username}
		/>
	)

	selectPieceHandler = (selectedPiece, visibleMoves) => {
		if (this.state.selectedPiece && samePosition(this.state.selectedPiece, selectedPiece)) {
			this.setState({ visibleMoves: [], selectedPiece: null });
		} else {
			this.setState({ visibleMoves, selectedPiece });
		}
	}

	selectCellHandler = (movesTo) => {
		this.state.socket.emit('move', movesTo[0]);
		this.setState({ visibleMoves: [] });
	}

	closeHandler = () => {
		this.props.history.push('/home');
	}

	newGameHandler = async () => {
		this.props.onSetLoading(true);
		await this.props.onSendGameInvite(
			this.state.game.source ? this.state.game.source._id
				: this.state.game.target._id,
			this.state.username,
		);
		this.props.onSetLoading(false);
		this.props.history.push('/home');
	}

	render() {
		const game = this.state.game;

		// Player chips
		const players = this.state.players; // online players
		const player = this.props.user;
		const playerChip = this.getChip(player.username, true);
		let adversaryChip = null;
		let adversary = null;
		if (game) {
			adversary = game.source || game.target;
			adversaryChip = this.getChip(adversary.username, players.length === 2);
		}

		let winner = null;
		if (this.state.winner) {
			if (this.state.winner === adversary._id) {
				winner = 'Sorry, you have lost!';
			} else {
				winner = 'Congrats, you have won!';
			}
		}

		return (
			<div className="Game">
				{adversaryChip}
				<Board
					game={this.state.game}
					pieces={this.state.pieces}
					moves={this.state.moves}
					visibleMoves={this.state.visibleMoves}
					selectedPiece={this.state.selectedPiece}
					selectPieceHandler={this.selectPieceHandler}
					selectCellHandler={this.selectCellHandler}
				/>
				{playerChip}
				<Dialog
					open={this.state.winner !== null}
					onClose={this.closeHandler}
				>
					<DialogTitle>{winner}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Do you want to play again against {adversary ? adversary.username : ''}?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.closeHandler} color="secondary">
							No
						</Button>
						<Button onClick={this.newGameHandler} color="primary">
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	user: state.auth.user,
	games: state.game.games,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onGetGames: () => dispatch(getGames()),
	onSendGameInvite: (userid, username) => dispatch(sendGameInvite(userid, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GameComponent));
