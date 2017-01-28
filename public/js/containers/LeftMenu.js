import React from 'react';
import MyFederations from '../components/leftMenu/MyFederations';
import MyTeams from '../components/leftMenu/MyTeams';

export default React.createClass({
    render: function () {
        return (
            <div>
                <MyFederations federations={this.props.federations} 
                               history={this.props.history}/>
                <MyTeams teams={this.props.teams} 
                         history={this.props.history}/>
            </div>
        )
    }
});
