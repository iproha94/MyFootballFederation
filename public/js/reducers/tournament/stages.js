import {GET_STAGES} from "../../constants";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STAGES:
            return [...action.payload];
        default:
            return state;
    }
}
