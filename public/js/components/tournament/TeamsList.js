import React from 'react';
import TeamCard from './TeamCard';

export default React.createClass({
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <TeamCard logo = {`/uploaded/team/logo/${item._id}.png`}
                          name = {item.name}
                          id = {item._id}/>
            )
        });
        return (
            <div className="row section">
                {list.length ? list : "Заявок от команд нет"}
            </div>
        )
    }
});
