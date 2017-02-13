import {
    GET_TOURNAMENT,
    ADD_MATHES_IN_STAGE,
    ROUTING
} from '../../constants';

export function getTournament(_id) {
    return (dispatch, getState) => {//благодаря Middleware получаем функцию dispatch
        $.get('/api/tournament/' + _id, function (result) {
            if(result.status == 404) {
                return dispatch({
                    type: ROUTING,
                    payload: {
                        nextUrl: "/404"
                    }
                });
            }

            dispatch({
                type: GET_TOURNAMENT,
                payload: result//такое наименование - негласное соглашение
            });
        });
    };
}

export function addMatchesInStage(idStage, matches) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_MATHES_IN_STAGE,
            payload: {matches: matches, idStage: idStage}
        });
    };
}