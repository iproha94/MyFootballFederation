import {GET_TEAMS} from '../constants/teams';
import {GET_TEAMS_BY_TOURNAMENT} from '../constants/teams';

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
                console.log("success");
                dispatch({
                    type: GET_TEAMS_BY_TOURNAMENT,
                    payload: result//такое наименование - негласное соглашение
                });
            });
        };
}