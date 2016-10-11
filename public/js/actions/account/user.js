import {GET_USER_BY_ID} from '../../constants';
import {GET_CURRENT_USER} from '../../constants';

export function getCurrentUser() {
    return (dispatch, getState) => {
        console.log("getCurrentUser");
        return $.when($.get("/api/get-current-user")).then(function (result) {
            console.log("dispatch");
            return dispatch({
                type: GET_CURRENT_USER,
                payload: result
            });
        });
    };
}

export function getUserById(_id) {
    return (dispatch, getState) => {
        return $.when($.get("/get-user/" + _id)).then(function (result) {
            return dispatch({
                type: GET_USER_BY_ID,
                payload: result
            });
        });
    };
}