import { combineReducers } from 'redux';
import tournament from './tournament/tournament';
import teams from './tournament/teams';
import teamsTournament from './tournament/teamsTournament';
import currentUser from './common/currentUser';
import pageUser from './account/pageUser';
import federations from './account/federations';
import usersList from './usersList/usersList';
import team from './team/team';
import tournamentList from './federation/tournamentList';
import federation from './federation/federation';
import match from './match/match';

export default combineReducers({
    tournament,
    teams,
    teamsTournament,
    pageUser,
    currentUser,
    federations,
    usersList,
    team,
    federation,
    tournamentList,
    match
});