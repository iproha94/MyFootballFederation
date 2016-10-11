import * as teamsActions from '../../actions/tournament/TeamsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React from 'react';

var Teams = React.createClass({
    render: function() {
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
        teams: state.teamsTournament
    }
})(Teams);