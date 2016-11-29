import React from 'react';
import List from '../../components/common/List';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        var federation = this.props.federation;
        return (
            <div className="container content-flex">
                <List header="Турниры:"
                      url="/tournament/"
                      defaultMessage="Турниров нет"
                      list={this.props.tournaments}/>
                {!this.props.federation.isAdmin ? null :
                    <div className="row right-align">
                        <Link className="waves-effect waves-light btn"
                              to={"/tournament/create/?federation=" + federation.name}>
                            Создать турнир
                        </Link>
                    </div>
                }
            </div>
        );
    }
});
