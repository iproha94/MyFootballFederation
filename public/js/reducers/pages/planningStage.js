import {
    GET_TEAMS_REQUESTS_IN_TOURNAMENT_BY_STAGE
}  from '../../constants';

const initialState = {
    teams: [],
    matches:[]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS_REQUESTS_IN_TOURNAMENT_BY_STAGE:
            var newState = {...state};
            newState.teams = action.payload;
            return newState;
        default:
            return state;
    }
}