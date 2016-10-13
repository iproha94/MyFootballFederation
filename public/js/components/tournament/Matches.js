import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../../actions/match';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.matchActions.getMatchesInTournament();
    },
    render: function () {
        var content = this.props.matches.map(function (item) {
            return  (
                <a href="/match/{{_id}}" className="collection-item">{item.team1} vs {item.team2}</a>
            )
        });
        if(!content) {
            content = "В турнире нет матчей";
        }
        return (
            <div className="row">
                <div className="tournament-list_header">
                    Список матчей:
                </div>
                <div className="collection">
                    {content}
                </div>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        matches: state.matchList
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);