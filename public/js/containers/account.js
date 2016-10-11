import React from 'react';
// import Federations from '../components/account/fedetations';
// import Teams from '../components/account/teams';
import * as accountActions from '../actions/account/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var Component = React.createClass({
    componentDidMount: function () {
        //'/account/get-creator/'
        //'/account/add-creator/'
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        var currentUser = this.props.currentUser;
        var pageUser = this.props.pageUser;
        return (
            <div>
                <div className="container content-margin-top content-flex">
                    <div className="center">
                        <h3>Страница пользователя</h3>
                        <h4>{pageUser.name ? "Имя пользователя: "+ pageUser.name:
                            "Ваше имя: " + currentUser.name}
                        </h4>
                        <h5>{currentUser.newUser ? "Поздравляем с регистрацией": ""}
                        </h5>
                    </div>
                </div>
            </div>
        )     
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser,
        pageUser: state.pageUser
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    }
})(Component);