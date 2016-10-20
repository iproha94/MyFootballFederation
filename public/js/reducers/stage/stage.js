import {GET_STAGE_INFO}  from '../../constants';

const initialState = {
    name: "",
    type: {},
    _id: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STAGE_INFO:
            return {...action.payload};
        default:
            return state;
    }
}