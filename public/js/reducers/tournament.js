import {GET_TOURNAMENT_INFO} from '../constants/tournament';

const initialState = {
    name: "unknown",
    type: "unknown"
};

export default function tournamentState(state = initialState, action) {

  switch (action.type) {
      case GET_TOURNAMENT_INFO:
      return { ...state, ...action.payload}//не изменяем объект state, а возвращаем новый

    default:
      return state;
  }

}
