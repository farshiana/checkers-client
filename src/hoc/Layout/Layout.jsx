import React, { Component } from 'react';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import Drawer from '../../components/UI/Drawer/Drawer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import './Layout.css';

class Layout extends Component {
	state = {
		drawer: false,
	}

	drawerHandler = (drawer) => {
		this.setState({ drawer });
	}

	render() {
		const loader = this.props.loading ? <CircularProgress className="Loader" /> : null;

		return (
			<div className="Layout">
				{loader}
				<Toolbar openHandler={() => this.drawerHandler(true)} />
				<Drawer open={this.state.drawer} onClose={() => this.drawerHandler(false)} />
				<ErrorBoundary>
					{this.props.children}
				</ErrorBoundary>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.ui.loading,
});

export default connect(mapStateToProps)(Layout);
