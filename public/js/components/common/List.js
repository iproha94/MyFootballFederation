import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <Link key={item._id} to={this.props.url + (item[this.props.urlParam] || item._id)} className="collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div className="container content-flex">
                <h5 className="center">{this.props.header}</h5>
                <div className="collection">
                    {list.length ? list : this.props.defaultMessage}
                </div>
            </div>
        )
    }
});
