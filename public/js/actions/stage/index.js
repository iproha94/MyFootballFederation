import {
    GET_STAGES, 
    GET_STAGE_INFO,
    GET_TEAMS_REQUESTS_IN_TOURNAMENT_BY_STAGE,
    ROUTING
} from '../../constants';

export function getStages(idTournament) {
    return (dispatch, getState) => {
        return $.when($.get("/api/tournament/get-stage/" + idTournament)).then(function (result) {
            return dispatch({
                type: GET_STAGES,
                payload: result
            });
        });
    };
}

export function getStage(idStage) {
    return (dispatch, getState) => {
        $.get("/api/stage/" + idStage, function (result) {
            if(result.status == 404) {
                return dispatch({
                    type: ROUTING,
                    payload: {
                        nextUrl: "/404"
                    }
                    
                });
            }

            dispatch({
                type: GET_STAGE_INFO,
                payload: result
            });
        });
    };
}

export function getTeamsInTournament(idStage) {
    return (dispatch, getState) => {
        $.get("/api/stage/" + idStage + "/get-teams-req", function (result) {
            dispatch({
                type: GET_TEAMS_REQUESTS_IN_TOURNAMENT_BY_STAGE,
                payload: result
            });
        });
    };
}