import axios from 'axios';
import alertify from 'alertify.js';

import {
	AUTH,
	SIGNOUT,
} from './actions';

export const autoSignin = () => async (dispatch) => {
	const { data } = await axios.get('/user');
	if (data.user) {
		dispatch({
			type: AUTH,
			user: data.user,
		});
	}
};

export const auth = (username, password, signinMode) => async (dispatch) => {
	let endpoint = '/login';
	if (!signinMode) {
		endpoint = '/register';
	}

	try {
		const { data } = await axios.post(endpoint, { username, password });
		dispatch({
			type: AUTH,
			user: data.user,
		});
	} catch (error) {
		if (error.response && error.response.status === 409) {
			alertify.error(`A user with username ${username} already exists`);
			return;
		}
		alertify.error(`Couldn't ${signinMode ? 'signin' : 'signup'}: ${error.toString()}`);
	}
};

export const signout = () => async (dispatch) => {
	try {
		await axios.get('/logout');
		dispatch({
			type: SIGNOUT,
		});
	} catch (error) {
		alertify.error(`Couldn't logout: ${error.toString()}`);
	}
};
