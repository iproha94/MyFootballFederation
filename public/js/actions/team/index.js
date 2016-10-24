import {GET_TEAMS,ADD_TEAMS_IN_TOURNAMENT} from '../../constants';
import {GET_TEAMS_BY_TOURNAMENT} from '../../constants';
import {GET_TEAM_INFO} from '../../constants';


export function getTeamInfo(_id) {
    return (dispatch) => {
        $.get('/api/team/' + _id, function (result) {
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