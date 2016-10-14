import {GET_TOURNAMENT} from '../../constants';
import {getTeamsByTournament} from '../team/index';

export function getTournament(_id) {
  return (dispatch, getState) => {//благодаря Middleware получаем функцию dispatch
    return $.when($.post('/api/tournament/' + _id)).then(function (result) {
       return dispatch({
        type: GET_TOURNAMENT,
        payload: result//такое наименование - негласное соглашение
      });
    });
  };
}