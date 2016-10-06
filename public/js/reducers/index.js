import { combineReducers } from 'redux';
import tournament from './tournament';
import modalWindow from './modalWindow';
import teams from './teams';

export default combineReducers({
    tournament,
    modalWindow,
    teams
});