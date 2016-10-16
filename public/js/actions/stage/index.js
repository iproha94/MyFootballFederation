import {GET_STAGES, GET_STAGE_INFO} from '../../constants';

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
        return $.when($.get("/api/stage/" + idStage)).then(function (result) {
            return dispatch({
                type: GET_STAGE_INFO,
                payload: result
            });
        });
    };
}