import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import auth from './../reducers/authenticationReducer';
import { routerReducer  } from 'react-router-redux'
const rootReducer = combineReducers({
    auth,
    routing: routerReducer
});

const loggerMiddleware = createLogger();
const initialState = {};

export default function configureStore() {
    let store;
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            )
        )
    );
    return store;
}