import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

const sentGameInvite = (props) => {
	const username = props.game.target ? props.game.target.username : props.game.source.username;

	return (
		<ListItem>
			<ListItemText inset primary={username} />
			<IconButton component={Link} to={`/game/${props.game._id}`}>
				<PlayArrowIcon color="primary" />
			</IconButton>
		</ListItem>
	);
}

export default sentGameInvite;
