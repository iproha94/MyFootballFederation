import React from 'react';
import List from '../../components/common/List';
import {Link} from 'react-router';
import CreateTournament from './CreateTournament';


export default React.createClass({
    render: function () {
        return (
            <div className="container content-flex">
                <List header="Турниры:"
                      url="/tournament/"
                      defaultMessage="Турниров нет"
                      list={this.props.tournaments}/>
                {!this.props.federation.isAdmin ? null : <CreateTournament federation={this.props.federation}/>}
            </div>
        );
    }
});
