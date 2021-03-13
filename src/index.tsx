import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppReducer';
import * as serviceWorker from './serviceWorker';
import AppReducer from "./AppReducer";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import AppRedux from "./AppRedux";

ReactDOM.render(
    <Provider store={store}>
    <AppRedux />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
