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
    getInitialState: function() {
        return {
            srcLogoTeam1: `/uploaded/team/logo/${this.props.match.team1._id}.png`,
            srcLogoTeam2: `/uploaded/team/logo/${this.props.match.team2._id}.png`
        }
    },
    resetTeamLogo1: function() {
        this.setState({srcLogoTeam1: '/img/default-team-logo.png'});
    },
    resetTeamLogo2: function() {
        this.setState({srcLogoTeam2: '/img/default-team-logo.png'});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({srcLogoTeam1: `/uploaded/team/logo/${nextProps.match.team1._id}.png`});
        this.setState({srcLogoTeam2: `/uploaded/team/logo/${nextProps.match.team2._id}.png`});
    },
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
                    <div className="col s12 card padding-disabled">
                        <div className="card-image">
                            <div className="match">
                                <img src="/img/match-default-banner.jpg" className="match_banner"/>
                                <img src={this.state.srcLogoTeam1}
                                     className="match_logo1"
                                     onError={this.resetTeamLogo1}/>
                                <img src="/img/vs.png" className="match_logo_vs" />
                                <img src={this.state.srcLogoTeam2}
                                     className="match_logo2"
                                     onError={this.resetTeamLogo2}/>
                            </div>
                        </div>

                        <div className="card-content">
                            <span className="card-title">
                               Матч {this.props.match.name}
                            </span>
                        </div>

                        <ul className="tabs tabs-fixed-width tabs_border-top">
                            <li className="tab col s3"><a href="#tab-id-1" className="active js-link">События</a></li>
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

                    <div id="tab-id-3" >
                        <div className="col s6 match-team-left">
                            <div className="card match-team">
                                <ListVusers header={this.props.match.team1.name}
                                            defaultMessage="Нет игроков"
                                            list={this.props.match.players1}/>

                                <Players idMatch={this.props.params.idMatch}
                                         team={this.props.match.currentUserTeam1}/>
                            </div>
                        </div>
                        <div className="col s6 match-team-right">
                            <div className="card match-team">
                                <ListVusers header={this.props.match.team2.name}
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