import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Tournament from './containers/tournament';
import Main from './containers/main';
import Team from './containers/team';
import NotFound from './containers/notFound';
import App from './containers/app';
import Account from './containers/account';
import UsersList from './containers/usersList';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Main} />
                <Route path='team/:idTeam' component={Team} />
                <Route path='users' component={UsersList} />
                <Route path='tournament' component={Tournament} />
                <Route path='account' component={Account} />
                <Route path='account/:idUser' component={Account} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);



