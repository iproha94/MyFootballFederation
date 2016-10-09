import * as teamsActions from '../actions/teamsActions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

var Teams = React.createClass({
    getContent: function () {
        console.log("sdfsd");
        if(this.props.tournament._id && !this.props.teams.success){
            this.props.teamsActions.getTeamsByTournament(this.props.tournament._id);
        }
    },
    componentWillMount:   function () {
        this.getContent();
    },
    componentWillReceiveProps:  function () {
        this.getContent();
    },
    componentWillUpdate:  function () {
        this.getContent();
    },
    componentDidUpdate:   function () {
        this.getContent();
    },
    render: function() {
        console.log(this.props);
        console.log(this.state);
            var teams = this.props.teams.map(function (item) {
            return (
                <a href={"/team/" + item._id} className="collection-item">{item.name}</a>
            )
        });
        
        return (
            <div className="row">
                <div className="tournament-list_header">
                    Список команд:
                </div>
                <div className="collection">
                    {teams}
                </div>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        tournament: state.tournament,
        teams: state.teams
    }
}, (dispatch)=>{
    return {
        teamsActions: bindActionCreators(teamsActions, dispatch)
    }
})(Teams);
