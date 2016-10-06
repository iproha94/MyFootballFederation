import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/tournament';
import configureStore from './store/configureStore';

const store = configureStore();

//Provider - благодаря ему мы сможем получать
// данные из store с помощью метода connect
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementsByClassName("js-content-place")[0]
);


//action - что произошло
//reducer - говорит о том как наше приложение должно на это измениться(изменяет state)
//store - содержит все состояние нашего приложения