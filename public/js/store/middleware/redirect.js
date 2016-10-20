import { browserHistory } from 'react-router'

import {
    ROUTING
} from '../../constants';

export const redirect = store => next => action => {
    if (action.type === ROUTING) {
        console.log("redirect");
        browserHistory[action.payload.method || "replace"](action.payload.nextUrl);
    }

    return next(action);
}