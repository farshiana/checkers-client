import { SET_LOADING } from '../actions/actions';
import { updateObject } from '../../tools/utils';

const initialState = {
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return updateObject(state, { loading: action.loading });
		default:
			return state;
	}
};

export default reducer;
