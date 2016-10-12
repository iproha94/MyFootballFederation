import { combineReducers } from 'redux';
import tournament from './tournament/tournament';
import modalWindow from './tournament/modalWindow';
import teams from './tournament/teams';
import teamsTournament from './tournament/teamsTournament';
import currentUser from './account/currentUser';
import pageUser from './account/pageUser';
import federations from './account/federations';
import usersList from './usersList/usersList';
import team from './team/team';

export default combineReducers({
    tournament,
    modalWindow,
    teams,
    teamsTournament,
    pageUser,
    currentUser,
    federations,
    usersList,
    team
});