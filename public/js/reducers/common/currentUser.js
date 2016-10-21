import {
    GET_CURRENT_USER,
    GET_FEDERATIONS,
    GET_TEAMS
}  from '../../constants';

const initialState = {
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
            var newState = {...action.payload, ...action.payload.user};
            delete newState.user;
            return newState;
        case GET_FEDERATIONS:
            var newState = {...state};
            newState.federations = [...action.payload];
            return newState;
        case GET_TEAMS:
            var newState = {...state};
            newState.teams = [...action.payload];
            return newState;
        default:
            return state;
    }
}