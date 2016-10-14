import {GET_USER_BY_ID} from '../../constants';
import {GET_CURRENT_USER} from '../../constants';
import {GET_ALL_USER} from '../../constants';


export function getUserById(_id) {
    console.log(_id);
    return (dispatch, getState) => {
        return $.when($.get("/api/get-user/" + _id)).then(function (result) {
            console.log("getUserById");
            return dispatch({
                type: GET_USER_BY_ID,
                payload: result
            });
        });
    };
}

export function getCurrentUser() {
    return (dispatch, getState) => {
        return $.when($.get("/api/get-current-user")).then(function (result) {
            return dispatch({
                type: GET_CURRENT_USER,
                payload: result
            });
        });
    };
}

export function getAllUser() {
    return (dispatch) => {
        $.get('/api/users', function (result) {
            dispatch({
                type: GET_ALL_USER,
                payload: result
            });
        });
    };
}