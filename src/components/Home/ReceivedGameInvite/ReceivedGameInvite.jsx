import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {
	setLoading,
	acceptGameInvite,
} from '../../../store/actions/index';

const receivedGameInvite = (props) => {
	const acceptInvite = async () => {
		props.onSetLoading(true);
		await props.onAcceptGameInvite(props.invite);
		props.onSetLoading(false);
		props.history.push(`/game/${props.invite._id}`);
	};

	const rejectInvite = () => {

	};

	return (
		<ListItem>
			<ListItemText inset primary={props.invite.source.username} />
			<IconButton onClick={acceptInvite}>
				<CheckIcon color="primary" />
			</IconButton>
			<IconButton onClick={rejectInvite}>
				<CloseIcon color="secondary" />
			</IconButton>
		</ListItem>
	);
};

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onAcceptGameInvite: invite => dispatch(acceptGameInvite(invite)),
});

export default connect(null, mapDispatchToProps)(withRouter(receivedGameInvite));
