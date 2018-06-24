import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

class ListElt extends Component {
	state = {
		open: false,
	};

	componentWillMount() {
		if (this.props.open) {
			this.setState({ open: true });
		}
	}

	toggleHandler = () => {
		this.setState({ open: !this.state.open });
	}

	render = () => (
		<Fragment>
			<ListItem button onClick={this.toggleHandler}>
				<ListItemIcon>
					{this.props.icon}
				</ListItemIcon>
				<ListItemText inset primary={this.props.title} />
				{this.state.open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={this.state.open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{this.props.items}
				</List>
			</Collapse>
		</Fragment>
	)
}

export default ListElt;
