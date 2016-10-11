import {GET_USER_BY_ID}  from '../../constants'

const initialState = {
    name: "",
    _id: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {...state, ...action.payload};
        default:
            return state;
    }
}