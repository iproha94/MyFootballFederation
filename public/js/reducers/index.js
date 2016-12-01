import { combineReducers } from 'redux';
import tournament from './pages/tournament';
import currentUser from './common/currentUser';
import pageUser from './pages/pageUser';
import usersList from './pages/usersList';
import team from './pages/team';
import federation from './pages/federation';
import match from './pages/match';
import stage from './pages/stage';
import planningStage from './pages/planningStage';
import main from './pages/main';

export default combineReducers({
    tournament,
    pageUser,
    currentUser,
    usersList,
    team,
    federation,
    match,
    stage,
    planningStage,
    main
});