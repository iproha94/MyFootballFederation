import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../actions/match';
import Chat from '../components/match/Chat';
import Events from '../components/match/Events';
import * as usersActions from '../actions/user';
import List from '../components/common/List';
import ListVusers from '../components/common/ListVusers';
import SearchUser from '../components/common/SearchUser';
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
        let logo1 = `/uploaded/team/logo/${this.props.match.team1._id}.png`;
        let logo2 = `/uploaded/team/logo/${this.props.match.team2._id}.png`;

        return (
            <div>
                <div className="row">
                    <div className="col s12 card padding-disabled">
                        <div className="card-image">
                            <div className="match">
                                <img src="/img/match-default-banner.jpg" className="match_banner"/>
                                <img src={logo1} className="match_logo1" />
                                <img src="/img/vs.png" className="match_logo_vs" />
                                <img src={logo2} className="match_logo2" />
                            </div>
                        </div>

                        <div className="card-content">
                            <span className="card-title">
                               Матч {this.props.match.name}
                            </span>
                        </div>

                        <ul className="tabs tabs-fixed-width tabs_border-top">
                            <li className="tab col s3"><a href="#tab-id-1" className="active js-link">Инфо</a></li>
                            <li className="tab col s3"><a className="js-link" href="#tab-id-2">Судьи</a></li>
                            <li className="tab col s3"><a href="#tab-id-3" className="js-link">Составы</a></li>
                        </ul>
                    </div>

                    <div id="tab-id-1" className="col s12 card">
                        <Events/>
                    </div>
                    <div id="tab-id-2" className="col s12 padding-disabled">
                        <List header="Список судей"
                              url="/account/"
                              defaultMessage="Судья не назначен"
                              list={this.props.match.refereeList}/>

                        {!this.props.match.isAdmin ? null :
                            <SearchUser sendField={this.props.match._id}
                                        nameSendField="idMatch"
                                        isCard={true}
                                        isAddCurrentUser={true}
                                        inputLabel="Добавить судью"
                                        actionSuccess={this.onSuccessAddReferee}
                                        url="/api-referee/add-referee"/>
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