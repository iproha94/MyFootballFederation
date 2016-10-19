import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Tournament from './containers/Tournament';
import Main from './containers/Main';
import Stage from './containers/Stage';
import Team from './containers/Team';
import NotFound from './containers/NotFound';
import App from './containers/App';
import Account from './containers/Account';
import UsersList from './containers/UsersList';
import CreateFederation from './containers/CreateFederation';
import CreateTeam from './containers/CreateTeam';
import Federation from './containers/Federation';
import CreateTournament from './containers/CreateTournament';
import Match from './containers/Match';
import CreateStage from './containers/CreateStage';
import Forbidden from './containers/Forbidden';

const store = configureStore();

function requireAuth(store) {
    return (nextState, replace, callback) => {
        var currentUser = store.getState().currentUser;
        if(!currentUser._id) {
            fetch("/api/is-authenticated", {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 500) {
                        replace("/forbidden");
                    }
                    callback();
                })
                .catch(error => {
                    callback(error);
                });
        } else {
            callback();
        }
    };
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Main} />
                <Route path='users' component={UsersList} />
                <Route path='forbidden' component={Forbidden} />
                <Route path='team/create' component={CreateTeam} onEnter={requireAuth(store)}/>
                <Route path='tournament/create' component={CreateTournament} onEnter={requireAuth(store)}/>
                <Route path='federation/create' component={CreateFederation} onEnter={requireAuth(store)}/>
                <Route path='stage/create' component={CreateStage} onEnter={requireAuth(store)}/>
                <Route path='team/:idTeam' component={Team} />
                <Route path='match/:idMatch' component={Match} />
                <Route path='account/:idUser' component={Account} />
                <Route path='tournament/:idTournament' component={Tournament} />
                <Route path='federation/:federationName' component={Federation} />
                <Route path='stage/:idStage' component={Stage} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);



