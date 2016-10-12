import {GET_TOURNAMENT_INFO} from '../../constants';

const initialState = {
    name: "unknown",
    type: "unknown"
};
    
export default function(state = initialState, action) {
  switch (action.type) {
      case GET_TOURNAMENT_INFO:
          return {...state, ...action.payload};
      default:
          return state;
  }
}
