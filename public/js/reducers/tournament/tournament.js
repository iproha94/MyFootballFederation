import * as consts from '../../constants/tournament';

const initialState = {
    name: "unknown",
    type: "unknown"
};
    
export default function(state = initialState, action) {

  switch (action.type) {
      case consts.GET_TOURNAMENT_INFO:
          return { ...state, ...action.payload}//не изменяем объект state, а возвращаем новый
      default:
          return state;
  }

}
