import {GET_FEDERATIONS, GET_FEDERATION_INFO, GET_TOURNAMENTS_IN_FEDERATION} from '../../constants';

export function getFederations() {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/get")).then(function (result) {
            return dispatch({
                type: GET_FEDERATIONS,
                payload: result
            });
        });
    };
}

export function getFederationInfo(name) {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/" + name)).then(function (result) {
            return dispatch({
                type: GET_FEDERATION_INFO,
                payload: result
            });
        });
    };
}

export function getTournamentsInFederation(name) {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/get-tournaments/" + name)).then(function (result) {
            return dispatch({
                type: GET_TOURNAMENTS_IN_FEDERATION,
                payload: result
            });
        });
    };
}