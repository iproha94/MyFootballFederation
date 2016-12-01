import React from 'react';
import {Link} from 'react-router';
import CreateTeam from './CreateTeam';

export default React.createClass({
    render: function () {
        var myTeams = this.props.teams.map((item) => {
            return (
                <Link key={item._id} to={"/team/" + item._id} className="collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div className="card">
                <div className="card-image">
                    <img src="/img/my-teams.jpg" />
                    <span className="card-title tournament_card-title">Мои команды</span>
                </div>

                <div className="collection left-menu-padding_card">
                    {myTeams.length ? myTeams : ""}
                </div>

                <CreateTeam history={this.props.history}/>
            </div>
        )
    }
});
