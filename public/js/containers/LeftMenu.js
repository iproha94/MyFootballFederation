import React from 'react';
import MyFederations from '../components/leftMenu/MyFederations';
import MyTeams from '../components/leftMenu/MyTeams';
import {connect} from 'react-redux';

var Component = React.createClass({
    render: function () {
        return (
            <div>
                <MyFederations federations = {this.props.federations} />
                <MyTeams teams = {this.props.teams} />
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        federations: state.currentUser.federations,
        teams: state.currentUser.teams,
    }
})(Component);
