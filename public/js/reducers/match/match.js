import {GET_MATCH, ADD_MESSAGE_IN_CHAT}  from '../../constants';

const initialState = {
    team1: {
        name: ""
    },
    team2: {
        name: ""
    },
    match: {
        _id: "",
        chat: []
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MATCH:
            return {...action.payload};
        case ADD_MESSAGE_IN_CHAT:
            var newState = {...state};
            newState.match.chat.push(action.payload);
            return newState;
        default:
            return state;
    }
}