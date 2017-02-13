import {
    GET_TOURNAMENT,
    GET_STAGES,
    GET_TEAMS_BY_TOURNAMENT,
    ADD_MATHES_IN_STAGE
} from '../../constants';

const initialState = {
    name: null,
    type: null,
    stages: [],
    teams: [],
    isAdmin: false
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
      case ADD_MATHES_IN_STAGE:
          var newState = {...state};
          for(var stage of newState.stages) {
              if(stage._id == action.payload.idStage) {
                  var matches = stage.matches || [];
                  stage.matches = matches.concat(action.payload.matches);
              }
          }
          return newState;
      default:
          return state;
  }
}
