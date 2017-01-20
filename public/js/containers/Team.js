import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../actions/team';
import VusersList from '../components/team/VusersList';
import CreateVuser from '../components/team/CreateVuser';
import Setting from '../components/team/Setting';

var Component = React.createClass({
    componentDidMount: function() {
        $('ul.tabs').tabs();
        this.props.teamActions.getTeamInfo(this.props.params.idTeam);
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.params.idTeam !== nextProps.params.idTeam) {
            this.props.teamActions.getTeamInfo(nextProps.params.idTeam);
        }
    },
    render: function () {
        let isOwnTeam = this.props.team.creators.indexOf(this.props.currentUser._id) != -1;
        let logo = `/uploaded/team/logo/${this.props.team._id}.png`;
        let banner = `/uploaded/team/banner/${this.props.team._id}.png`;

        return (
            <div>
                <div className="col s12 card padding-enabled">
                    <div className="card-image">
                        <img src={banner}/>
                        <span className="card-title tournament_card-title">
                            Страница команды {this.props.team.name}
                        </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s4"><a href="#players">Игроки</a></li>
                        <li className="tab col s4"><a href="#matches">Матчи</a></li>
                        <li className="tab col s4"><a href="#setting">Настройка</a></li>
                    </ul>
                </div>

                <div id="players" className="col s12 card">
                    <VusersList vusers={this.props.team.vplayersWithName}/>

                    {!isOwnTeam ?
                        null :
                        <CreateVuser team={this.props.team}
                                     history={this.props.history}
                                     teamActions={this.props.teamActions}/>
                    }
                </div>

                <div id="matches" className="col s12 card">
                    здесь будут матчи
                </div>

                <div id="setting" className="col s12 card">
                    <Setting />
                </div>
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