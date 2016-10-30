import {
    GET_TOURNAMENT,
    GET_STAGES,
    GET_TEAMS_BY_TOURNAMENT
} from '../../constants';

const initialState = {
    name: null,
    type: null,
    stages: [],
    teams: []
};
    
export default function(state = initialState, action) {
  switch (action.type) {
      case GET_TOURNAMENT:
          return {...state, ...action.payload};
      case GET_STAGES:
          var newState = {...state};
          newState.stages = [...action.payload];
          return newState;
      case GET_TEAMS_BY_TOURNAMENT:
          var newState = {...state};
          newState.teams = [...action.payload];
          return newState;
      default:
          return state;
  }
}
