import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './hoc/Layout/Layout';

const loading = () => <CircularProgress className="Loader" />;

const Auth = Loadable({
	loader: () => import('./components/Auth/Auth'),
	loading,
});
const OnlineGame = Loadable({
	loader: () => import('./components/Game/OnlineGame'),
	loading,
});
const Home = Loadable({
	loader: () => import('./components/Home/Home'),
	loading,
});
const NewGame = Loadable({
	loader: () => import('./components/NewGame/NewGame'),
	loading,
});
const Friends = Loadable({
	loader: () => import('./components/Friends/Friends'),
	loading,
});
const PreviousGames = Loadable({
	loader: () => import('./components/PreviousGames/PreviousGames'),
	loading,
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#E91E63',
		},
		secondary: {
			main: '#F48FB1',
		},
	},
});

const app = (props) => {
	// Before authentication
	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Redirect to="/auth" />
		</Switch>
	);

	// After authentication
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/newgame" component={NewGame} />
				<Route path="/previousgames" component={PreviousGames} />
				<Route path="/friends" component={Friends} />
				<Route path="/game/:gameId" component={OnlineGame} />
				<Redirect to="/home" />
			</Switch>
		);
	}

	return (
		<MuiThemeProvider theme={theme}>
			<Layout>{routes}</Layout>
		</MuiThemeProvider>
	);
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(app));
