import {
    GET_MATCH,
    ADD_EVENT_IN_LOG,
    DEL_EVENT_IN_LOG
}  from '../../constants';

const initialState = {
    currentUserTeam1: {
            players: [],
            vplayers: []
    },
    currentUserTeam2: {
        players: [],
        vplayers: []
    },
    team1: {
        name: ""
    },
    team2: {
        name: ""
    },
    _id: "",
    refereeList: [],
    federation: {
        _id: ''
    },
    events: [],
    date: 0,
    isAdmin: false,
    players1: [],
    players2: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MATCH:
            return {...state, ...action.payload};
        case ADD_EVENT_IN_LOG:
            var newState = {...state};
            newState.events.push(action.payload);
            return newState;
        case DEL_EVENT_IN_LOG:
            var newState = {...state};
            newState.events = newState.events.filter(obj => {
                return obj.idAction !== -action.payload.idAction;
            });
            return newState;
        default:
            return state;
    }
}