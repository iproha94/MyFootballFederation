import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var list = this.props.players.map((item) => {
            return (
                <p key={item.id} className="collection-item">
                    {item.name}
                </p>
            )
        });
        return (
            <div className="content-margin-top content-flex">
                <div className="collection">
                    {list.length ? list : "никого нет"}
                </div>
            </div>
        )
    }
});
