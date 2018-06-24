import { updateObject } from '../../tools/utils';
import {
	SAVE_GAMES,
	SAVE_PREVIOUS_GAMES,
	SAVE_SENT_GAME_INVITES,
	SAVE_RECEIVED_GAME_INVITES,
	ACCEPT_GAME_INVITE,
	SEND_GAME_INVITE,
} from '../actions/actions';

const initialState = {
	games: [],
	previousGames: [],
	sentGameInvites: [],
	receivedGameInvites: [],
};

const reducer = (state = initialState, action) => {
	const { games } = state;

	switch (action.type) {
		case SAVE_GAMES:
			return updateObject(state, { games: action.games });
		case SAVE_PREVIOUS_GAMES:
			return updateObject(state, { previousGames: action.previousGames });
		case SAVE_SENT_GAME_INVITES:
			return updateObject(state, { sentGameInvites: action.sentGameInvites });
		case SAVE_RECEIVED_GAME_INVITES:
			return updateObject(state, { receivedGameInvites: action.receivedGameInvites });
		case ACCEPT_GAME_INVITE:
			// Remove invite from received invites
			// Add game to games
			const { receivedGameInvites } = state;
			const index = receivedGameInvites.findIndex(gameInvite => (
				gameInvite._id === action.gameInvite._id
			));
			receivedGameInvites.splice(index, 1);
			games.push(action.game);
			return updateObject(state, {
				receivedGameInvites,
				games,
			});
		case SEND_GAME_INVITE:
			const { sentGameInvites } = state;
			sentGameInvites.push(action.sentGameInvite);
			return updateObject(state, {
				sentGameInvites,
			});
		default:
			return state;
	}
};

export default reducer;
