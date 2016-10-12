import {GET_TOURNAMENT_INFO} from '../../constants';
import {getTeamsByTournament} from '../team/teams';

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
//спросить у кого нибуть как он выполняет действия зависящие друг от друга
export function getTournamentPageInfo() {
  return (dispatch, getState) => {
      dispatch(getTournament()).then(() => {
        var _id = getState().tournament._id;
        dispatch(getTeamsByTournament(_id));
      });
  };
}
