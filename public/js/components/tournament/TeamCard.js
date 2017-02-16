/**
 * Created by ilyaps on 16.02.17.
 */
import React from 'react';
import {Link} from 'react-router';


export default React.createClass({
    getInitialState: function() {
        return {srcLogo: this.props.logo};
    },
    resetTeamlogo: function() {
        this.setState({srcLogo: '/img/default-team-logo.png'});
    },
    render: function () {
        return (
            <div className="col s12 l3 m4 list_team"  key={this.props.id}>
                <div className="card">
                    <div className="list_team_content__padding">
                        <div className="card-image team-logo-in-list">
                            <img className="team-logo-in-list_image"
                                 src={this.state.srcLogo}
                                 onError={this.resetTeamlogo}/>
                        </div>
                        <div className="card-action">
                            <Link to={"/team/" + this.props.id}>{this.props.name}</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});