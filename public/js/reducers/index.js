import { combineReducers } from 'redux';
import tournament from './tournament/tournament';
import modalWindow from './tournament/modalWindow';
import teams from './tournament/teams';
import teamsTournament from './tournament/teamsTournament';
import currentUser from './account/currentUser';
import pageUser from './account/pageUser';

export default combineReducers({
    tournament,
    modalWindow,
    teams,
    teamsTournament,
    pageUser,
    currentUser
});