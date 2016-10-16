import {GET_FEDERATION_INFO}  from '../../constants';

const initialState = {
    creators: [],
    name: "",
    _id: "",
    city: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FEDERATION_INFO:
            return {...state, ...action.payload};
        default:
            return state;
    }
}