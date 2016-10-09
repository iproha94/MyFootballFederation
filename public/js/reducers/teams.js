import * as consts from "../constants/teams";

const initialState = [];

export default function teamsState(state = initialState, action) {
    switch (action.type) {
        case consts.GET_TEAMS_BY_TOURNAMENT:
            var result = [...state, ...action.payload];
            result.success = true;
            return result;//не изменяем объект state, а возвращаем новый
        default:
            return state;
    }
}