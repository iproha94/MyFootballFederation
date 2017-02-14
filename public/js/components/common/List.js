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
        
        return list.length ?
                <div className="collection card">
                    {list}
                </div>
                :
                <div className="list-empty_padding card">
                    {this.props.defaultMessage}
                </div>

    }
});