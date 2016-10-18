import {GET_TEAMS} from "../../constants";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS:
            var result = [...action.payload];
            result.success = true;
            return result;//не изменяем объект state, а возвращаем новый
        default:
            return state;
    }
}