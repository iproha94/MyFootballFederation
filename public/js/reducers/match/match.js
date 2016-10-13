import {GET_MATCH}  from '../../constants';

const initialState = {
    team1: {
        name: ""
    },
    team2: {
        name: ""
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MATCH:
            return {...state, ...action.payload};
        default:
            return state;
    }
}