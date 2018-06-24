import axios from 'axios';
import alertify from 'alertify.js';

import {
	SAVE_GAMES,
	SAVE_PREVIOUS_GAMES,
	SAVE_SENT_GAME_INVITES,
	SAVE_RECEIVED_GAME_INVITES,
	ACCEPT_GAME_INVITE,
	SEND_GAME_INVITE,
} from './actions';

export const getGames = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/games/active');
		dispatch({
			type: SAVE_GAMES,
			games: data.games,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch games: ${error.toString()}`);
	}
};

export const getPreviousGames = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/games/inactive');
		dispatch({
			type: SAVE_PREVIOUS_GAMES,
			previousGames: data.games,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch previous games: ${error.toString()}`);
	}
};

export const getSentGameInvites = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/gameinvites/sent');
		dispatch({
			type: SAVE_SENT_GAME_INVITES,
			sentGameInvites: data.invites,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch sent game invites: ${error.toString()}`);
	}
};

export const getReceivedGameInvites = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/gameinvites/received');
		dispatch({
			type: SAVE_RECEIVED_GAME_INVITES,
			receivedGameInvites: data.invites,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch received game invites: ${error.toString()}`);
	}
};

export const acceptGameInvite = gameInvite => async (dispatch) => {
	try {
		const { data } = await axios.post(`/user/gameinvite/${gameInvite._id}`);
		dispatch({
			type: ACCEPT_GAME_INVITE,
			gameInvite,
			game: data.game,
		});
		return data.game;
	} catch (error) {
		alertify.error(`Couldn't accept game invite: ${error.toString()}`);
		return null;
	}
};

export const sendGameInvite = (userid, username) => async (dispatch) => {
	try {
		const { data } = await axios.post('/user/gameinvite', { userid });
		dispatch({
			type: SEND_GAME_INVITE,
			sentGameInvite: data.invite,
		});
		alertify.success(`A game invite was sent to ${username}`);
	} catch (error) {
		alertify.error(`Couldn't send game invite: ${error.toString()}`);
	}
};
