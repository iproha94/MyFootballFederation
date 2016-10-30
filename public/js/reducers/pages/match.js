import {
    GET_MATCH, 
    ADD_MESSAGE_IN_CHAT,
    ADD_EVENT_IN_LOG
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
    events: [],
    isFederationCreator: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MATCH:
            return {...state, ...action.payload};
        case ADD_MESSAGE_IN_CHAT:
            var newState = {...state};
            newState.chat.push(action.payload);
            return newState;
        case ADD_EVENT_IN_LOG:
            var newState = {...state};
            newState.events.push(action.payload);
            return newState;
        default:
            return state;
    }
}