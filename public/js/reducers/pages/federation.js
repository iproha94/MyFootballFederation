import {
    GET_FEDERATION_INFO,
    GET_TOURNAMENTS_IN_FEDERATION
}  from '../../constants';

const initialState = {
    creators: [],
    name: null,
    _id: null,
    city: null,
    tournaments: [],
    isAdmin: false,
    runningMatches: [],
    members: [],
    membersWithName: []
};

//реализация при которой если один из запросов пройдет не успешно
//то будут отображаться данные на половину верные а на половину
//с другой страницы
//можно решить - бросая какое нибуть событие в случае неудачи

//еще одна проблема - необходимо вызывать все эти методы одновременно
//если не вызвать то будут отображаться данные с другой страницы

//еще но - поля данные для которых долны загружаться не в месте с 
//первым запросом - должны быть приравнены дофолтным значениям в 
//в первом запросе 

//ну вообщем тут все сложно
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FEDERATION_INFO:
            return {...state, ...action.payload};
        case GET_TOURNAMENTS_IN_FEDERATION:
            var newState = {...state};
            newState.tournaments = [...action.payload];
            return newState;
        default:
            return state;
    }
}