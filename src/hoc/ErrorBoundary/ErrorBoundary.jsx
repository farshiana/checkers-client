import { Component } from 'react';
import alertify from 'alertify.js';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
	componentDidCatch(error) {
		console.error(error);
		alertify.error(`An error occurred: ${error.toString}`);
	}

	render = () => (this.props.children)
}

export default ErrorBoundary;
