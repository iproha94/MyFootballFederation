import * as teamsActions from '../../actions/team/teams';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React from 'react';

var Teams = React.createClass({
    componentDidMount: function () {
        this.props.teamsActions.getTeams();
    },
    render: function () {
        var teams = this.props.teams.map(function (item) {
            return (
                <li className="collection-item" key={item._id}>
                    <div>
                        {item.name}
                        <a href={"/team/" + item._id} className="secondary-content">
                            <i className="material-icons">send</i>
                        </a>
                    </div>
                </li>
            )
        });

        if(!this.props.pageUser.name) {
            var buttonCreateTeam = (
                <li className="collection-item right">
                    <a className="btn-floating btn-large waves-effect waves-light red" href="/team/create"><i className="material-icons">add</i></a>
                </li>
            )
        }

        return (
            <ul className="collection with-header">
                <li className="collection-header center"><h5>Команды</h5></li>
                {teams.length ? teams : "Пользователь не состоит в командах"}
                {buttonCreateTeam}
            </ul>
        );
    }
});

export default connect((state)=>{
    return {
        teams: state.teams,
        pageUser: state.pageUser
    }
}, (dispatch)=>{
    return {
        teamsActions: bindActionCreators(teamsActions, dispatch)
    }
})(Teams);

