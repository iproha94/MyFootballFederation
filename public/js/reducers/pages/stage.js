import {
    GET_STAGE_INFO,
    GET_MATCHES_IN_STAGE
}  from '../../constants';

const initialState = {
    name: "",
    type: {},
    _id: "",
    matches: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STAGE_INFO:
            return {...initialState, ...action.payload};
        case GET_MATCHES_IN_STAGE:
            var newState = {...state};
            newState.matches = [...action.payload];
            return newState;
        default:
            return state;
    }
}