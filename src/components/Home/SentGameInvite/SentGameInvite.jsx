import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const sentGameInvite = (props) => {
	const deleteInvite = () => {

	};

	return (
		<ListItem>
			<ListItemText inset primary={props.invite.target.username} />
			<IconButton onClick={deleteInvite}>
				<CloseIcon color="secondary" />
			</IconButton>
		</ListItem>
	);
}

export default sentGameInvite;
