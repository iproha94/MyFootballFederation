import React from 'react';
import List from '../../components/common/List';
import {connect} from 'react-redux';
import {Link} from 'react-router';

var Component = React.createClass({
    render: function () {
        var myFederations = this.props.federations.map((item) => {
            return (
                <Link key={item._id} to={"/federation/" + item.name} className="collection-item">
                    {item.name}
                </Link>
            )
        });
        var myTeams = this.props.teams.map((item) => {
            return (
                <Link key={item._id} to={"/team/" + item._id} className="collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div>
                <div className="card">
                    <div className="card-image">
                        <img src="/img/my-federations.jpg" />
                        <span className="card-title tournament_card-title">Мои федерации</span>
                    </div>

                    <div className="collection left-menu-padding_card">
                        {myFederations.length ? myFederations : ""}
                    </div>

                    <Link to="/federation/create" className="waves-effect waves-light width-fullscreen btn">Создать</Link>
                </div>

                <div className="card">
                    <div className="card-image">
                        <img src="/img/my-teams.jpg" />
                        <span className="card-title tournament_card-title">Мои команды</span>
                    </div>

                    <div className="collection left-menu-padding_card">
                        {myTeams.length ? myTeams : ""}
                    </div>

                    <Link to="/team/create" className="waves-effect waves-light width-fullscreen btn">Создать</Link>
                </div>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        federations: state.currentUser.federations,
        teams: state.currentUser.teams,
        isAuthenticated: !!state.currentUser._id
}
})(Component);
