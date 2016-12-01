import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <div className="card col l2 m2 card-indent" key={item._id}>
                    <div className="card-image">
                        <img src="/img/team-default-logo.png" />
                    </div>
                    <div className="card-action">
                        <Link to={"\\team\\" + item._id}>{item.name}</Link>
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
