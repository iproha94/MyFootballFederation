import React from 'react';

export default React.createClass({
    render: function () {
        var list = this.props.vusers.map((item) => {
            return (
                <p key={item._id} className="collection-item">
                    {item.name}
                </p>
            )
        });

        return list.length ?
            <div className="collection card">
                {list}
            </div>
            :
            <div className="list-empty_padding card">
                В команде игроков нет
            </div>

    }
});