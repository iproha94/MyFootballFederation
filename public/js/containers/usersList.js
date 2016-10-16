import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '../components/common/List';
import * as usersActions from '../actions/user';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.usersActions.getAllUser();
    },
    render: function () {
        return (
            <List header="Пользователи"
                  url="/account/"
                  defaultMessage="Пользователей нет"
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
})(Component);
