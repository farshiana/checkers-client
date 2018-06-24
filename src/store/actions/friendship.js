import axios from 'axios';
import alertify from 'alertify.js';

import {
	SAVE_FRIENDSHIPS,
	REMOVE_FRIENDSHIP,
	SAVE_SENT_FRIEND_REQUESTS,
	REMOVE_SENT_FRIEND_REQUEST,
	SAVE_RECEIVED_FRIEND_REQUESTS,
	ACCEPT_RECEIVED_FRIEND_REQUEST,
	REMOVE_RECEIVED_FRIEND_REQUEST,
	SEND_FRIEND_REQUEST,
} from './actions';

export const getFriendships = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/friendships');
		dispatch({
			type: SAVE_FRIENDSHIPS,
			friendships: data.friendships,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch friendships: ${error.toString()}`);
	}
};

export const deleteFriendship = friendship => async (dispatch) => {
	try {
		await axios.delete(`/user/friendship/${friendship._id}`);
		dispatch({
			type: REMOVE_FRIENDSHIP,
			friendship,
		});
		alertify.success('Friendship was deleted');
	} catch (error) {
		alertify.error('Friendship could not be removed');
	}
};

export const getSentFriendRequests = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/friendrequests/sent');
		dispatch({
			type: SAVE_SENT_FRIEND_REQUESTS,
			sentFriendRequests: data.requests,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch sent friend requests: ${error.toString()}`);
	}
};

export const deleteSentFriendRequest = friendRequest => async (dispatch) => {
	try {
		await axios.delete(`/user/friendrequest/${friendRequest._id}`);
		dispatch({
			type: REMOVE_SENT_FRIEND_REQUEST,
			friendRequest,
		});
	} catch (error) {
		alertify.error(`Coulnd't delete friend request: ${error.toString()}`);
	}
};

export const getReceivedFriendRequests = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/user/friendrequests/received');
		dispatch({
			type: SAVE_RECEIVED_FRIEND_REQUESTS,
			receivedFriendRequests: data.requests,
		});
	} catch (error) {
		alertify.error(`Couldn't fetch received friend requests: ${error.toString()}`);
	}
};

export const acceptReceivedFriendRequest = friendRequest => async (dispatch) => {
	try {
		const { data } = await axios.post(`/user/friendrequest/${friendRequest._id}`);
		dispatch({
			type: ACCEPT_RECEIVED_FRIEND_REQUEST,
			friendRequest,
			friendship: data.friendship,
		});
	} catch (error) {
		alertify.error(`Couldn't accept friend request: ${error.toString()}`);
	}
};

export const deleteReceivedFriendRequest = friendRequest => async (dispatch) => {
	try {
		await axios.delete(`/user/friendrequest/${friendRequest._id}`);
		dispatch({
			type: REMOVE_RECEIVED_FRIEND_REQUEST,
			friendRequest,
		});
	} catch (error) {
		alertify.error(`Coulnd't reject friend request: ${error.toString()}`);
	}
};

export const sendFriendRequest = username => async (dispatch) => {
	try {
		const { data } = await axios.post('/user/friendrequest', { username });
		dispatch({
			type: SEND_FRIEND_REQUEST,
			sentFriendRequest: data.request,
		});
		alertify.success(`A friend request was sent to ${username}`);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			alertify.error(`User ${username} does not exist`);
		} else {
			alertify.error(`Couldn't send friend request: ${error.toString()}`);
		}
	}
};
