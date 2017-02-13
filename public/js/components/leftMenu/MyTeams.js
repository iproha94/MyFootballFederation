import React from 'react';
import {Link} from 'react-router';
import CreateTeamButton from './CreateTeamButton';

export default React.createClass({
    getInitialState: function() {
        return {nowBanner: '/img/default-team-banner.png'};
    },
    setTeamBanner: function(id) {
        this.setState({nowBanner: `/uploaded/team/banner/${id}.png`});
    },
    resetTeamBanner: function() {
        this.setState({nowBanner: '/img/default-team-banner.png'});
    },
    render: function () {
        var myTeams = this.props.teams.map((item) => {
            let boundSetTeamBanner = this.setTeamBanner.bind(this, item._id);
            return (
                <Link key={item._id}
                      onMouseLeave={this.resetTeamBanner}
                      onMouseEnter={boundSetTeamBanner}
                      to={"/team/" + item._id}
                      className="truncate collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div className="card">
                <div className="card-image left-menu_banner">
                    <img src={this.state.nowBanner}
                         onError={this.resetTeamBanner}
                         className="left-menu_banner"/>
                    <span className="card-title tournament_card-title">Мои команды</span>
                </div>

                <div className="collection left-menu-padding_card">
                    {myTeams.length ? myTeams : ""}
                </div>

                <CreateTeamButton/>
            </div>
        )
    }
});
