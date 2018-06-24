import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

import {
	setLoading,
	signout,
} from '../../../store/actions/index';

const toolbar = (props) => {
	const signoutHandler = async () => {
		props.onSetLoading(true);
		await props.onSignout();
		props.onSetLoading(false);
	}

	const menu = props.isAuthenticated ? (
		<IconButton color="inherit" onClick={props.openHandler}>
			<MenuIcon />
		</IconButton>
	) : null;
	const logout = props.isAuthenticated
		? <Button color="inherit" onClick={signoutHandler}>Logout</Button>
		: null;

	let title = '';
	switch(props.location.pathname) {
		case '/auth':
			title = 'Authentication';
			break;
		case '/home':
			title = 'Home';
			break;
		case '/newgame':
			title = 'New Game';
			break;
		case '/friends':
			title = 'My Friends';
			break;
		default:
			break;
	}
	if (props.location.pathname.indexOf('/game/') === 0) {
		title = 'Game';
	}

	return (
		<AppBar position="fixed" color="primary">
			<Toolbar>
				{menu}
				<Typography variant="title" color="inherit" style={{flex: 1}}>
					{title}
				</Typography>
				{logout}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	onSetLoading: loading => dispatch(setLoading(loading)),
	onSignout: () => dispatch(signout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toolbar));
