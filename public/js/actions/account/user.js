import {GET_TOURNAMENT_INFO} from '../../constants/tournament';

export function getTournament() {
    return (dispatch, getState) => {//благодаря Middleware получаем функцию dispatch
        return $.when($.post(location.pathname)).then(function (result) {
            return dispatch({
                type: GET_TOURNAMENT_INFO,
                payload: result//такое наименование - негласное соглашение
            });
        });
    };
}