import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../actions/team';
import ListVusers from '../components/common/ListVusers';
import {Link} from 'react-router';


var Component = React.createClass({
    componentDidMount: function() {
        this.props.teamActions.getTeamInfo(this.props.params.idTeam);
    },
    render: function () {
        var isOwnTeam = this.props.team.creators.indexOf(this.props.currentUser._id) != -1;

        return (
            <div>
                <div className="container content-margin-top content-flex">
                    Страница команды {this.props.team.name}
                </div>

                <ListVusers header="Игроки команды (виртуальные пользователи)"
                      defaultMessage="Никого нет"
                      list={this.props.team.vplayersWithName}/>
                {isOwnTeam ? <Link to={"/vuser/create?team=" + this.props.team._id} className="waves-effect waves-light btn">Добавить игрока</Link> : ""}
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