import React from 'react';
import { Link } from 'react-router';
import * as accountActions from '../actions/user/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var App = React.createClass({
    componentDidMount: function () {
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    }
})(App);