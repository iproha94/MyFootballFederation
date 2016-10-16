import {GET_TOURNAMENTS_IN_FEDERATION}  from '../../constants';

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TOURNAMENTS_IN_FEDERATION:
            return [...state, ...action.payload];
        default:
            return state;
    }
}