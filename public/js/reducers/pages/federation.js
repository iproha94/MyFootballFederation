import {
    GET_FEDERATION_INFO,
    GET_TOURNAMENTS_IN_FEDERATION
}  from '../../constants';

const initialState = {
    creators: [],
    name: null,
    _id: null,
    city: null,
    tournaments: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FEDERATION_INFO:
            return {...initialState, ...action.payload};
        case GET_TOURNAMENTS_IN_FEDERATION:
            var newState = {...state};
            newState.tournaments = [...action.payload];
            return newState;
        default:
            return state;
    }
}