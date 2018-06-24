import { updateObject } from '../../tools/utils';
import {
	SAVE_FRIENDSHIPS,
	REMOVE_FRIENDSHIP,
	SAVE_SENT_FRIEND_REQUESTS,
	REMOVE_SENT_FRIEND_REQUEST,
	SAVE_RECEIVED_FRIEND_REQUESTS,
	ACCEPT_RECEIVED_FRIEND_REQUEST,
	REMOVE_RECEIVED_FRIEND_REQUEST,
	SEND_FRIEND_REQUEST,
} from '../actions/actions';

const initialState = {
	friendships: [],
	sentFriendRequests: [],
	receivedFriendRequests: [],
};

const reducer = (state = initialState, action) => {
	const { friendships, sentFriendRequests, receivedFriendRequests } = state;

	switch (action.type) {
		case SAVE_FRIENDSHIPS:
			return updateObject(state, { friendships: action.friendships });
		case REMOVE_FRIENDSHIP:
			const friendshipIndex = friendships.findIndex(friendship => friendship._id === action.friendship._id);
			friendships.splice(friendshipIndex, 1);
			return updateObject(state, { friendships });
		case SAVE_SENT_FRIEND_REQUESTS:
			return updateObject(state, { sentFriendRequests: action.sentFriendRequests });
		case REMOVE_SENT_FRIEND_REQUEST:
			const sentFriendRequestIndex = sentFriendRequests.findIndex(friendRequest => (
				friendRequest._id === action.friendRequest._id
			));
			sentFriendRequests.splice(sentFriendRequestIndex, 1);
			return updateObject(state, { sentFriendRequests });
		case SAVE_RECEIVED_FRIEND_REQUESTS:
			return updateObject(state, { receivedFriendRequests: action.receivedFriendRequests });
		case ACCEPT_RECEIVED_FRIEND_REQUEST:
			// Remove request from received requests
			// Add friendship to friendships
			const index = receivedFriendRequests.findIndex(friendRequest => (
				friendRequest._id === action.friendRequest._id
			));
			receivedFriendRequests.splice(index, 1);
			friendships.push(action.friendship);
			return updateObject(state, {
				receivedFriendRequests,
				friendships,
			});
		case REMOVE_RECEIVED_FRIEND_REQUEST:
			const receivedFriendRequestIndex = receivedFriendRequests.findIndex(friendRequest => (
				friendRequest._id === action.friendRequest._id
			));
			receivedFriendRequests.splice(receivedFriendRequestIndex, 1);
			return updateObject(state, { receivedFriendRequests });
		case SEND_FRIEND_REQUEST:
			sentFriendRequests.push(action.sentFriendRequest);
			return updateObject(state, {
				sentFriendRequests,
			});
		default:
			return state;
	}
};

export default reducer;
