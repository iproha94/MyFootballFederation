import {GET_STAGES} from '../../constants';

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