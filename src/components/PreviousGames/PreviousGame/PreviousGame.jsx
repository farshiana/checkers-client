import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const previousGame = (props) => {
	const adversary = props.game.target ? props.game.target : props.game.source;

	const created = new Date(props.game.created);
	const ymd = `${created.getDate()}/${created.getUTCMonth() + 1}/${created.getFullYear()}`;

	let word = 'won';
	let icon = <MoodIcon />;
	if (props.game.winner === adversary._id) {
		word = 'lost';
		icon = <MoodBadIcon />;
	}
	const text = `${ymd} You ${word} against ${adversary.username}`;

	return (
		<ListItem>
			<ListItemIcon>
				{icon}
			</ListItemIcon>
			<ListItemText inset primary={text} />
		</ListItem>
	);
}

export default previousGame;
