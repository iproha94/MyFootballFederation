import {GET_TOURNAMENT_INFO} from '../constants/tournament';

export function getTournament() {
  return (dispatch, getState) => {//благодаря Middleware получаем функцию dispatch
    console.log(getState,getState());
    $.post(location.pathname, function (result) {
      dispatch({
        type: GET_TOURNAMENT_INFO,
        payload: result//такое наименование - негласное соглашение
      });
    });
  };
}
