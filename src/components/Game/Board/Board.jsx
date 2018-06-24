import React, { Component } from 'react';

import './Board.css';
import Cell from '../Cell/Cell';
import { samePosition } from '../../../tools/utils';

class Board extends Component {
	state = {
		width: null,
		height: null,
	}

	componentWillMount() {
		this.updateDimensions();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render = () => {
		const size = this.props.game ? this.props.game.size : 8;
		const board = [...Array(size*size)].map((_, index) => {
			const position = { x: index % size, y: Math.floor(index / size) };
			const piece = this.props.pieces.find(piece => samePosition(piece, position));

			const movesFrom = this.props.moves.reduce((array, move, index) => {
				if (samePosition(move.start, position)) {
					// A move can be made from this cell
					array.push(index);
				}
				return array;
			}, []);

			const movesTo = this.props.visibleMoves.reduce((array, move) => {
				if (samePosition(this.props.moves[move].end, position)) {
					// This cell is where a visible move ends
					// So it can be targeted
					array.push(move);
				}
				return array;
			}, []);

			return (
				<Cell
					key={`cell_${index}`}
					size={size}
					game={this.props.game}
					position={position}
					piece={piece}
					movesFrom={movesFrom}
					unique={this.props.moves.length === movesFrom.length && movesFrom.length > 0}
					movesTo={movesTo}
					selectPieceHandler={() => this.props.selectPieceHandler(piece, movesFrom)}
					selectHandler={() => this.props.selectCellHandler(movesTo)}
				/>
			);
		});

		const min = Math.min(this.state.width, this.state.height - 260);
		return (
			<div
				className="Board"
				style={{ width: `${min}px`, height: `${min}px` }}
			>
				{board}
			</div>
		);
	}
}

export default Board;
