import React from 'react';
import CreateFederation from './CreateFederation';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var myFederations = this.props.federations.map((item) => {
            return (
                <Link key={item._id} to={"/federation/" + item.name} className="truncate collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div className="card">
                <div className="card-image">
                    <img src="/img/my-federations.jpg" />
                    <span className="card-title tournament_card-title">Мои федерации</span>
                </div>

                <div className="collection left-menu-padding_card">
                    {myFederations.length ? myFederations : ""}
                </div>

                <CreateFederation history={this.props.history}/>
            </div>
        )
    }
});
