import {GET_TEAMS,ADD_TEAMS_IN_TOURNAMENT} from '../../constants';
import {GET_TEAMS_BY_TOURNAMENT} from '../../constants';

export function getTeams() {
    return (dispatch) => {
        $.post('/team/get-team/', function (result) {
            dispatch({
                type: GET_TEAMS,
                payload: result//такое наименование - негласное соглашение
            });
        });
    };
}

export function getTeamsByTournament(tournamentId) {
    return (dispatch, getState) => {
        $.post(`/team/get-team-by-tournament/${tournamentId}`, function (result) {
            return dispatch({
                type: GET_TEAMS_BY_TOURNAMENT,
                payload: result//такое наименование - негласное соглашение
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