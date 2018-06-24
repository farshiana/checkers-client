/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import App from './App'; // eslint-disable-line import/no-named-as-default, import/no-named-as-default-member
import registerServiceWorker from './registerServiceWorker';
import uiReducer from './store/reducers/ui';
import authReducer from './store/reducers/auth';
import friendshipReducer from './store/reducers/friendship';
import gameReducer from './store/reducers/game';
import { signout, autoSignin } from './store/actions/index';

const rootReducer = combineReducers({
	ui: uiReducer,
	auth: authReducer,
	friendship: friendshipReducer,
	game: gameReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(thunk),
);

axios.defaults.baseURL = `${process.env.REACT_APP_API}/api`;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	response => response,
	(error) => {
		if (error.status === 401) {
			store.dispatch(signout);
		}
		console.error(error);
		return Promise.reject(error);
	},
);

store.dispatch(autoSignin()).then(() => {
	const app = (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);

	ReactDOM.render(app, document.getElementById('root'));
});

registerServiceWorker();
