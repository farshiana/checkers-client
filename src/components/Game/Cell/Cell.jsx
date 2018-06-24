import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { connect } from 'react-redux';

import './Cell.css';
import Piece from '../Piece/Piece';

class Cell extends Component  {
	componentWillUpdate(nextProps) {
		if (!this.props.unique && nextProps.unique && nextProps.piece.player === this.props.user._id) {
			// Only one piece can move => auto-select this piece if it belongs to this player
			nextProps.selectPieceHandler(nextProps.piece);
		}
	}

	render() {
		const piece = !this.props.piece ? null
			: (
				<Piece
					piece={this.props.piece}
					selectHandler={() => this.props.selectPieceHandler(this.props.piece)}
					movesFrom={this.props.movesFrom}
					game={this.props.game}
				/>
			);

		let color = (this.props.position.x + this.props.position.y)%2 === 0 ? 'white' : '#3E2723';
		if (this.props.movesFrom.length > 0) {
			color = '#8D6E63';
		} else if (this.props.movesTo.length > 0) {
			color = '#F48FB1';
		}

		let debug = null;
		if (process.env.NODE_ENV === 'development') {
			debug = <div className="Debug" >({this.props.position.x}, {this.props.position.y})</div>;
		}

		return (
			<div
				className="Cell"
				style={{
					width: `${100/this.props.size}%`,
					height: `${100/this.props.size}%`,
					backgroundColor: color,
				}}
			>
				<ButtonBase disabled={this.props.movesTo.length === 0} onClick={this.props.selectHandler} />
				{debug}
				{piece}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(Cell);
