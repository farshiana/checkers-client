import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PeopleIcon from '@material-ui/icons/People';

const drawer = (props) => {
	const links = [
		{ to: "/home", text: "Home", icon: <HomeIcon className="PrimaryIcon" /> },
		{ to: "/newgame", text: "New Game", icon: <AddCircleIcon className="PrimaryIcon" /> },
		{ to: "/friends", text: "My Friends", icon: <PeopleIcon className="PrimaryIcon" /> },
	];

	const listItems = links.map((link) => (
		<ListItem key={link.to} button component={Link} to={link.to} onClick={props.onClose}>
			<ListItemIcon>
				{link.icon}
			</ListItemIcon>
			<ListItemText inset primary={link.text} />
		</ListItem>
	));

	return (
		<Drawer open={props.open} onClose={props.onClose}>
			<div style={{width: "250px"}}>
				<List>
					{listItems}
				</List>
			</div>
		</Drawer>
	);
};

export default drawer;
