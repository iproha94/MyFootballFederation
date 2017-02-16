import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var list = this.props.list.map((item) => {
            let logo = `/uploaded/team/logo/${item._id}.png`;
            return (
                <div className="col s12 l3 m4 list_team"  key={item._id}>
                    <div className="card">
                        <div className="list_team_content__padding">
                            <div className="card-image team-logo-in-list">
                                <img className="team-logo-in-list_image" src={logo} />
                            </div>
                            <div className="card-action">
                                <Link to={"/team/" + item._id}>{item.name}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="row section">
                {list.length ? list : "Заявок от команд нет"}
            </div>
        )
    }
});
