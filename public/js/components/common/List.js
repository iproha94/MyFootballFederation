import React from 'react';

export default React.createClass({
    render: function () {
        var list = this.props.list.map(function (item) {
            return (
                <li className="collection-item" key={item._id}>
                    <div>{item.name}
                        <a href="/account/{{_id}}" className="secondary-content">
                            <i className="material-icons">send</i>
                        </a>
                    </div>
                </li>
            )
        });
        return (
            <div className="container content-margin-top content-flex">
                <ul className="collection with-header">
                    <li className="collection-header center"><h5>{this.props.header}</h5></li>
                    {list}
                </ul>
            </div>
        )
    }
});
