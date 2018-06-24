import { updateObject } from '../../tools/utils';
import {
	AUTH,
	SIGNOUT,
} from '../actions/actions';

const initialState = {
	isAuthenticated: false,
	user: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH:
			return updateObject(state, {
				isAuthenticated: true,
				user: action.user,
			});
		case SIGNOUT:
			return updateObject(state, {
				isAuthenticated: false,
				user: null,
			});
		default:
			return state;
	}
};

export default reducer;
