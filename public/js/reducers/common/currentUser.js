import {
    GET_CURRENT_USER,
    GET_FEDERATIONS,
    ADD_FEDERATION_CURRENT_USER,
    ADD_TEAM_CURRENT_USER,
    LOGOUT,
    REMOVE_CURRENT_USER_FEDERATION,
    ADD_CURRENT_USER_FEDERATION
}  from '../../constants';

const initialState = {
    email: null,
    notifications: false,
    name: "",
    _id: "",
    teams: [],
    federations: [],
    newUser: false,
    image: '/img/camera.png'
};


export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {...state, ...action.payload};
        case GET_FEDERATIONS:
            var newState = {...state};
            newState.federations = [...action.payload];
            return newState;
        case ADD_FEDERATION_CURRENT_USER:
            var newState = {...state};
            newState.federations.push(action.payload);
            return newState;
        case ADD_TEAM_CURRENT_USER:
            var newState = {...state};
            newState.teams.push(action.payload);
            return newState;
        case LOGOUT:
            return initialState;
        case REMOVE_CURRENT_USER_FEDERATION:
            var newState = {...state};
            var newFederations = [];
            for(var federation of state.federations) {
                if(federation.name != action.payload) {
                    newFederations.push(federation);
                }
            }
            newState.federations = newFederations;
            return newState;
        case ADD_CURRENT_USER_FEDERATION:
            var newState = {...state};
            newState.federations.push(action.payload);
            return newState;
        default:
            return state;
    }
}