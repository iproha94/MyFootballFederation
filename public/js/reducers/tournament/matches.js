import {GET_MATCHES_IN_TOURNAMENT} from '../../constants';

const initialState = [];

export default function(state = initialState, action){
    switch (action.type) {
        case GET_MATCHES_IN_TOURNAMENT:
            return [ ...state, ...action.payload];
        default:
            return state;
    }
}