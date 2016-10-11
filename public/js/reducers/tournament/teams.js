import * as consts from "../../constants/tournament";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case consts.GET_TEAMS:
            var result = [...state, ...action.payload];
            result.success = true;
            return result;//не изменяем объект state, а возвращаем новый
        default:
            return state;
    }
}