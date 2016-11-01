import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Nav from '../components/common/Nav';

var App = React.createClass({
    componentDidMount: function () {
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        return (
            <div>
                <Nav location={this.props.location}/>
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