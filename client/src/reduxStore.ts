import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, initialState as AuthState } from './reducers/authReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas/index';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';

export const history = createBrowserHistory();

const browserMiddleware = routerMiddleware(history);

const initialState = {
  auth: AuthState,
};

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, browserMiddleware)),
);

sagaMiddleware.run(rootWatcher);

export default store;
