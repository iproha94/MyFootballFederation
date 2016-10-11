import * as consts from "../../constants/tournament";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case consts.GET_TEAMS_BY_TOURNAMENT:
            var result = [...state, ...action.payload];
            result.success = true;
            return result;//не изменяем объект state, а возвращаем новый
        case consts.ADD_TEAMS_IN_TOURNAMENT:
            var result = [...state, ...action.payload];
            return result;
        default:
            return state;
    }
}