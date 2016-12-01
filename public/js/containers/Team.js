import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../actions/team';
import PlayersList from '../components/team/PlayersList';
import {Link} from 'react-router';


var Component = React.createClass({
    componentDidMount: function() {
        $('ul.tabs').tabs();
        this.props.teamActions.getTeamInfo(this.props.params.idTeam);
    },
    render: function () {
        var isOwnTeam = this.props.team.creators.indexOf(this.props.currentUser._id) != -1;

        return (
            <div>
                <div className="col s12 card padding-enabled">
                    <div className="card-image">
                        <img src="http://www.bailoy.com/wp-content/uploads/2016/03/slide2.jpg"/>
                        <span className="card-title tournament_card-title">
                            Страница команды {this.props.team.name}
                        </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a href="#players">Игроки</a></li>
                        <li className="tab col s6"><a href="#matches">Матчи</a></li>
                    </ul>
                </div>

                <div id="players" className="col s12 card">
                    <PlayersList players = {this.props.team.vplayersWithName}/>

                    {isOwnTeam ? <Link to={"/vuser/create?team=" + this.props.team._id} className="waves-effect waves-light btn">Добавить игрока</Link> : ""}
                </div>

                <div id="matches" className="col s12 card">
                    здесь будут матчи
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