import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '../components/common/List';
import * as usersActions from '../actions/user/users';

var UsersListPage = React.createClass({
    componentDidMount: function() {
        this.props.usersActions.getAllUser();
    },
    render: function () {
        return (
            <List header="Пользователи"
                  list={this.props.usersList}/>
        )
    }
});

export default connect((state)=>{
    return {
        usersList: state.usersList
    }
}, (dispatch)=>{
    return {
        usersActions: bindActionCreators(usersActions, dispatch)
    }
})(UsersListPage);
