import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../actions/team';
import VusersList from '../components/team/VusersList';
import CreateVuser from '../components/team/CreateVuser';
import Setting from '../components/team/Setting';
import MatchList from '../components/team/MatchList';
import List from '../components/common/List';

var Component = React.createClass({
    getInitialState: function() {
        return {srcTeamBanner: '/img/my-teams.jpg'};
    },
    componentDidMount: function() {
        this.props.teamActions.getTeamInfo(this.props.params.idTeam);
    },
    componentDidUpdate: function () {
        $('ul.tabs').tabs();
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.params.idTeam !== nextProps.params.idTeam) {
            this.props.teamActions.getTeamInfo(nextProps.params.idTeam);
        }
        this.setState({srcTeamBanner: `/uploaded/team/banner/` + nextProps.team._id + `.png`});
    },
    teamBannerNotFound: function() {
        this.setState({srcTeamBanner: '/img/my-teams.jpg'});
    },
    render: function () {
        let isAdmin = this.props.team.creators.indexOf(this.props.currentUser._id) != -1;

        return (
            <div>
                <div className="col s12 card padding-disabled">
                    <div className="card-image">
                        <img src={this.state.srcTeamBanner} onError={this.teamBannerNotFound}/>

                        <span className="card-title tournament_card-title">
                            Страница команды {this.props.team.name}
                        </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s4"><a href="#players">Игроки</a></li>
                        <li className="tab col s4"><a href="#matches">Матчи</a></li>
                        {!isAdmin ? null :
                            <li className="tab col s4"><a href="#setting">Настройка</a></li>
                        }
                    </ul>
                </div>

                <div id="players" className="col s12 card ">
                    <VusersList vusers={this.props.team.vplayersWithName}/>

                    {!isAdmin ?
                        null :
                        <div className="row">
                            <div className="col s12">
                                <CreateVuser team={this.props.team}
                                             history={this.props.history}
                                             teamActions={this.props.teamActions}/>
                            </div>
                        </div>
                    }
                </div>

                <div id="matches" className="col s12 card padding-disabled">
                    <MatchList matches={this.props.team.matches}/>
                </div>
                
                {!isAdmin ? null :
                    <div id="setting" className="col s12 card">
                        <Setting team={this.props.team}/>
                    </div>
                }
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser,
        team: state.team
    }
}, (dispatch)=>{
    return {
        teamActions: bindActionCreators(teamActions, dispatch)
    }
})(Component);