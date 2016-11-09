import React from 'react';
import {Link} from 'react-router';

//я думаю это временный файл, чтобы я хоть как то показывал список виртуальных пользователей, потом сделаю лучше
export default React.createClass({
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <p key={item.id} className="collection-item">
                    {item.name}
                </p>
            )
        });
        return (
            <div className="content-margin-top content-flex">
                <h5 className="center">{this.props.header}</h5>
                <div className="collection">
                    {list.length ? list : this.props.defaultMessage}
                </div>
            </div>
        )
    }
});
