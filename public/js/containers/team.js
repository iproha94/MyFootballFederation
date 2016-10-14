import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as teamActions from '../actions/team';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.teamActions.getTeamInfo(this.props.params.idTeam);
    },
    render: function () {
        return (
            <div className="container content-margin-top content-flex">
                Страница команды {this.props.team.name}
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        team: state.team
    }
}, (dispatch)=>{
    return {
        teamActions: bindActionCreators(teamActions, dispatch)
    }
})(Component);