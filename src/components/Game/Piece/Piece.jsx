import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { connect } from 'react-redux';

import './Piece.css';

const piece = (props) => {
	const firstColor = props.game.source ? props.piece.player === props.user._id
		: props.piece.player !== props.user._id;
	return (
		<div className="Piece">
			<ButtonBase
				onClick={props.selectHandler}
				disabled={props.movesFrom.length === 0 || props.piece.player !== props.user._id}
				className={props.piece.man ? 'Man' : 'King'}
				style={{ backgroundColor: firstColor ? 'steelblue' : 'coral' }}
			/>
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(piece);
