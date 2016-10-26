import {
    ADD_TEAMS_IN_TOURNAMENT,
    GET_TEAMS_BY_TOURNAMENT, 
    GET_TEAM_INFO,
    ROUTING
} from '../../constants';


export function getTeamInfo(_id) {
    return (dispatch, getState) => {
        $.get('/api/team/' + _id, function (result) {
            if(result.status == 404) {
                return dispatch({
                    type: ROUTING,
                    payload: {
                        nextUrl: "/404"
                    }

                });
            }

            dispatch({
                type: GET_TEAM_INFO,
                payload: result
            });
        });
    };
}

export function getTeamsByTournament(tournamentId) {
    return (dispatch, getState) => {
        $.post(`/api/team/get-team-by-tournament/${tournamentId}`, function (result) {
            return dispatch({
                type: GET_TEAMS_BY_TOURNAMENT,
                payload: result
            });
        });
    };
}

export function addTeamsInTournament(_id) {
    return (dispatch, getState) => {
        for(var team in getState().teams) {
            console.log(team._id, _id);
            if(team._id == _id){
                return dispatch({
                    type: ADD_TEAMS_IN_TOURNAMENT,
                    payload: _id
                });
            }
        }
    };
}