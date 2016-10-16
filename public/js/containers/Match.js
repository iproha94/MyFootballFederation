import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../actions/match';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.matchActions.getMatch(this.props.params.idMatch);
    },
    render: function () {
        return (
            <div className="container content-margin-top content-flex">
                Страница матча {this.props.match.team1.name} 
                - {this.props.match.team2.name}
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        match: state.match
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);