/**
 * Main store function
 */
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import combineReducers from './reducers';

export function configureStore(initialState = {}) {
    // Middleware and store enhancers
    const enhancers = [
        applyMiddleware(thunk),
    ];

    if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
        // Enable DevTools only when rendering on client and during development.
        enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    }
    console.log('Initial state',initialState);
    const store = createStore(combineReducers, initialState, compose(...enhancers));

    // For hot reloading reducers
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
