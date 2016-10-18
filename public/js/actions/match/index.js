import {GET_MATCH, GET_MATCHES_IN_TOURNAMENT, ADD_MESSAGE_IN_CHAT} from '../../constants';

export function getMatch(_id) {
    return (dispatch, getState) => {
        return $.when($.get("/api/match/" + _id)).then(function (result) {
            return dispatch({
                type: GET_MATCH,
                payload: result
            });
        });
    };
}
export function getMatchesInTournament(_id) {
    return (dispatch, getState) => {
        return $.when($.get("/api/tournament/get-matches/:" + _id)).then(function (result) {
            return dispatch({
                type: GET_MATCHES_IN_TOURNAMENT,
                payload: result
            });
        });
    };
}

export function addMessageInChat(object) {
    return (dispatch, getState) => {
        return dispatch({
            type: ADD_MESSAGE_IN_CHAT,
            payload: object
        });
    };
}