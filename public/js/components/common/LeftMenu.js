import React from 'react';
import List from '../../components/common/List';
import {connect} from 'react-redux';
import {Link} from 'react-router';

var Component = React.createClass({
    render: function () {
        return (
            <div>
                <List header="Мои федерации"
                      url="/federation/"
                      defaultMessage="Федераций нет"
                      urlParam="name"
                      list={this.props.federations}/>
                <Link to="/federation/create" className="waves-effect waves-light btn">Создать федерацию</Link>

                <List header="Мои команды"
                      url="/team/"
                      defaultMessage="Команд нет"
                      list={this.props.teams}/>
                <Link to="/team/create" className="waves-effect waves-light btn">Создать команду</Link>
            </div>
        )
    }
});

export default connect((state)=>{
    return {
        federations: state.currentUser.federations,
        teams: state.currentUser.teams,
        isAuthenticated: !!state.currentUser._id
}
})(Component);
