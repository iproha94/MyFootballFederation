import {GET_TOURNAMENT} from '../../constants';

const initialState = {
    name: "unknown",
    type: "unknown"
};
    
export default function(state = initialState, action) {
  switch (action.type) {
      case GET_TOURNAMENT:
          return {...action.payload};
      default:
          return state;
  }
}
