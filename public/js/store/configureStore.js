import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
//import createLogger from 'redux-logger';
import {redirect} from './middleware/redirect';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, redirect)//аналог app.use() express
    );
}
//единственный путь изменить store - отправить действие dispatch(action)