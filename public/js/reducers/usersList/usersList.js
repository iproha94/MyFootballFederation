import {GET_ALL_USER} from '../../constants';

const initialState = [];

export default function(state = initialState, action){
    switch (action.type) {
        case GET_ALL_USER:
            return [...action.payload];
        default:
            return state;
    }
}
