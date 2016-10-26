import {
    GET_MATCH, 
    ADD_MESSAGE_IN_CHAT,
}  from '../../constants';

const initialState = {
    team1: {
        name: ""
    },
    team2: {
        name: ""
    },
    _id: "",
    chat: [],
    refereeList: [],
    federation: {
        _id: ''
    },
    isFederationCreator: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MATCH:
            var newState = {...action.payload, ...action.payload.match};
            delete newState.match;
            return newState;
        case ADD_MESSAGE_IN_CHAT:
            var newState = {...state};
            newState.chat.push(action.payload);
            return newState;
        default:
            return state;
    }
}