import {
    GET_TEAM_INFO
}  from '../../constants';

const initialState = {
    name: "",
    _id: "",
    vplayers: [],
    vplayersWithName: [],
    creators: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEAM_INFO:
            return {...state, ...action.payload};
        default:
            return state;
    }
}