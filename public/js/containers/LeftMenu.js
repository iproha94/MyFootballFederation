import React from 'react';
import MyFederations from '../components/leftMenu/MyFederations';
import MyTeams from '../components/leftMenu/MyTeams';
import {connect} from 'react-redux';

var Component = React.createClass({
    render: function () {
        return (
            <div>
                <MyFederations federations={this.props.currentUser.federations} 
                               history={this.props.history}/>
                <MyTeams teams={this.props.currentUser.teams} 
                         history={this.props.history}/>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser
    }
})(Component);
