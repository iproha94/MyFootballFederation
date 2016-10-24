import { combineReducers } from 'redux';
import tournament from './tournament/tournament';
import teamsTournament from './tournament/teamsTournament';
import currentUser from './common/currentUser';
import pageUser from './pageUser';
import usersList from './usersList/usersList';
import team from './team/team';
import tournamentList from './federation/tournamentList';
import federation from './federation/federation';
import match from './match/match';
import matchList from './stage/matches';
import stages from './tournament/stages';
import stage from './stage/stage';



export default combineReducers({
    tournament,
    teamsTournament,
    pageUser,
    currentUser,
    usersList,
    team,
    federation,
    tournamentList,
    match,
    matchList,
    stages,
    stage
});