import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../actions/match';
import Chat from '../components/match/Chat';
import Events from '../components/match/Events';
import * as usersActions from '../actions/user';
import List from '../components/common/List';
import ListVusers from '../components/common/ListVusers';
import ModalWindow from '../components/common/ModalWindow';
import Players from '../components/match/Players';


var Component = React.createClass({
    componentDidMount: function() {
        $('ul.tabs').tabs();
        this.props.matchActions.getMatch(this.props.params.idMatch);
        this.props.usersActions.getAllUser();
    },
    onSuccessAddReferee: function () {
        this.props.matchActions.getMatch(this.props.params.idMatch);
    },
    render: function () {
        return (
            <div>
            <div className="row">
                <div className="col s12 card padding-enabled">
                    <div className="card-image">
                        <img src="http://www.drodd.com/images13/football-wallpapers.jpg"/>
                                <span className="card-title">
                                    Страница матча {this.props.match.name}
                                </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s3"><a href="#tab-id-1" className="js-link">Инфо</a></li>
                        <li className="tab col s3"><a className="active js-link" href="#tab-id-2">Судьи</a></li>
                        <li className="tab col s3"><a href="#tab-id-3" className="js-link">Составы</a></li>
                    </ul>
                </div>

                <div id="tab-id-1" className="col s12 card">
                    <Events/>
                </div>
                <div id="tab-id-2" className="col s12 card">
                    <List header="Список судей"
                          url="/account/"
                          defaultMessage="Судья не назначен"
                          list={this.props.match.refereeList}/>

                    {!this.props.match.isAdmin ? null :
                        <div className="container">
                            <ModalWindow urlSend='/api-referee/add-referee'
                                         buttonName="Добавить судью"
                                         header="Список пользователей"
                                         nameHiddenInput="idMatch"
                                         valueArray={this.props.usersList}
                                         valueHiddenInput={this.props.match._id}
                                         onSuccess={this.onSuccessAddReferee}/>
                        </div>
                    }
                </div>
                <div id="tab-id-3" className="col s12 card">
                    <div className="row">
                        <div className="col s6">
                            <ListVusers header="Список игроков команды 1"
                                        defaultMessage="Нет игроков"
                                        list={this.props.match.players1}/>

                            <Players idMatch={this.props.params.idMatch}
                                     team={this.props.match.currentUserTeam1}/>
                        </div>
                        <div className="col s6">
                            <ListVusers header="Список игроков команды 2"
                                        defaultMessage="Нет игроков"
                                        list={this.props.match.players2}/>

                            <Players idMatch={this.props.params.idMatch}
                                     team={this.props.match.currentUserTeam2}/>
                        </div>
                    </div>
                </div>
            </div>
                <Chat/>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        match: state.match,
        usersList: state.usersList
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch),
        usersActions: bindActionCreators(usersActions, dispatch)
    }
})(Component);