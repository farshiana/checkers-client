// UI
export { setLoading } from './ui';

// AUTH
export {
	autoSignin,
	auth,
	signout,
} from './auth';

// FRIENDSHIPS
export {
	getFriendships,
	deleteFriendship,
	getSentFriendRequests,
	deleteSentFriendRequest,
	getReceivedFriendRequests,
	acceptReceivedFriendRequest,
	deleteReceivedFriendRequest,
	sendFriendRequest,
} from './friendship';

// GAMES
export {
	getGames,
	getPreviousGames,
	getSentGameInvites,
	getReceivedGameInvites,
	acceptGameInvite,
	sendGameInvite,
} from './game';
