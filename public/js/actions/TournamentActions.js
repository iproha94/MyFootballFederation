import {GET_TOURNAMENT_INFO} from '../constants/tournament';

export function getTournament() {
  return (dispatch) => {//юлагодаря Middleware получаем функцию dispatch
    $.post(location.pathname, function (result) {
      dispatch({
        type: GET_TOURNAMENT_INFO,
        payload: result//такое наименование - негласное соглашение
      });
    });
  };
}
