import {GET_CURRENT_USER}  from '../../constants'

const initialState = {
    name: "",
    _id: "",
    newUser: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {...action.payload};
        default:
            return state;
    }
}