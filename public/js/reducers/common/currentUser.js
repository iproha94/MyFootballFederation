import {
    GET_CURRENT_USER,
    GET_FEDERATIONS,
    ADD_FEDERATION_CURRENT_USER,
    ADD_TEAM_CURRENT_USER,
    LOGOUT
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
        default:
            return state;
    }
}