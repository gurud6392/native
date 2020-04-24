/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore } from 'redux';
import reducer from './src/store/reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

const reduxProvider = () =>( 

    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => reduxProvider);
