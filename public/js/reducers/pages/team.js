import {
    GET_TEAM_INFO
}  from '../../constants';

const initialState = {
    name: "",
    _id: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEAM_INFO:
            return {...action.payload};
        default:
            return state;
    }
}