import {
    GET_DATABASE
}  from '../../constants';

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DATABASE:
            return [...action.payload];
        default:
            return state;
    }
}