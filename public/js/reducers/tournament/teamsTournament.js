import {GET_TEAMS_BY_TOURNAMENT} from "../../constants";
import {ADD_TEAMS_IN_TOURNAMENT} from "../../constants";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS_BY_TOURNAMENT:
            var result = [...state, ...action.payload];
            result.success = true;
            return result;//не изменяем объект state, а возвращаем новый
        case ADD_TEAMS_IN_TOURNAMENT:
            var result = [...state, ...action.payload];
            return result;
        default:
            return state;
    }
}