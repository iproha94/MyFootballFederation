import {
    GET_FEDERATIONS,
    GET_FEDERATION_INFO,
    GET_TOURNAMENTS_IN_FEDERATION,
    GET_FEDERATIONS_USER,
    ADD_FEDERATION_CURRENT_USER,
    ROUTING
} from '../../constants';

export function getFederationsCurrentUser() {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/get-by-creator")).then(function (result) {
            return dispatch({
                type: GET_FEDERATIONS,
                payload: result
            });
        });
    };
}

export function getFederationsUser(id) {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/get-by-creator?idUser=" + id)).then(function (result) {
            return dispatch({
                type: GET_FEDERATIONS_USER,
                payload: result
            });
        });
    };
}

export function addFederationCurrentUser(team) {
    return (dispatch, getState) => {
        return dispatch({
            type: ADD_FEDERATION_CURRENT_USER,
            payload: team
        });
    };
}

export function getFederationInfo(name) {
    return (dispatch, getState) => {
        fetch("/api/federation/" + name, {credentials: 'include'})
            .then((response) => response.json())
            .then((result) => {
                if(result.status == 404) {
                    return dispatch({
                        type: ROUTING,
                        payload: {
                            nextUrl: "/404"
                        }
                    });
                }

                dispatch({
                    type: GET_FEDERATION_INFO,
                    payload: result
                });
            });
        };
}

export function getTournamentsInFederation(name) {
    return (dispatch, getState) => {
        console.log("/api/federation/get-tournaments/" + name);
        return $.when($.get("/api/federation/get-tournaments/" + name)).then(function (result) {
            console.log(result);
            return dispatch({
                type: GET_TOURNAMENTS_IN_FEDERATION,
                payload: result
            });
        });
    };
}