import { combineReducers } from 'redux';
import tournament from './tournament/tournament';
import modalWindow from './tournament/modalWindow';
import teams from './tournament/teams';
import teamsTournament from './tournament/teamsTournament';
import user from './account/user';

export default combineReducers({
    tournament,
    modalWindow,
    teams,
    teamsTournament,
    user
});