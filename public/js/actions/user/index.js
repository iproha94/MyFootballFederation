import {
    GET_USER_BY_ID,
    GET_CURRENT_USER,
    GET_ALL_USER,
    ROUTING,
    LOGOUT,
    REMOVE_CURRENT_USER_FEDERATION,
    ADD_CURRENT_USER_FEDERATION
} from '../../constants';


export function getUserById(_id) {
    return (dispatch, getState) => {
        $.get("/api/get-user/" + _id, function (result) {
            if(result.status == 404) {
                return dispatch({
                    type: ROUTING,
                    payload: {
                        nextUrl: "/404"
                    }
                });
            }

            dispatch({
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

export function logout() {
    return (dispatch, getState) => {
        dispatch({
            type: LOGOUT,
            payload: {}
        });
    }
}

export function removeCurrentUserFederation(name) {
    return (dispatch, getState) => {
        return dispatch({
            type: REMOVE_CURRENT_USER_FEDERATION,
            payload: name
        });
    };
}

export function addCurrentUserFederation(federation) {
    return (dispatch, getState) => {
        return dispatch({
            type: ADD_CURRENT_USER_FEDERATION,
            payload: federation
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