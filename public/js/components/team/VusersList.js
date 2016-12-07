import React from 'react';
import List from '../../components/common/List';

export default React.createClass({
    render: function () {
        return (
            <div className="container content-flex">
                <List header="Игроки:"
                      url="/vuser/"
                      defaultMessage="Игроков нет"
                      list={this.props.vusers}/>
            </div>
        );
    }
});