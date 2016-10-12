import React from 'react';
import Federations from '../components/account/fedetations';
import Teams from '../components/account/teams';
import * as accountActions from '../actions/user/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWindow from '../components/common/ModalWindow';

var Component = React.createClass({
    componentDidMount: function () {
        //'/account/get-creator/'
        if(this.props.params.idUser){
            this.props.accountActions.getUserById(this.props.params.idUser);
        }
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        var currentUser = this.props.currentUser;
        var pageUser = this.props.pageUser;

        var ModalWin = '';
        if(this.props.pageUser.name) {
            ModalWin = (
                <ModalWindow urlSend="/account/add-creator/"
                         header="hello"
                         inputName="idUser"
                         nameHiddenInput="idUser"
                         valueArray={this.props.federations}
                         valueHiddenInput={this.props.pageUser._id}/>
            )
        }
        return (
            <div>
                <div className="container content-margin-top content-flex">
                    <div className="center">
                        <h3>Страница пользователя</h3>
                        <h4>{pageUser.name ? "Имя пользователя: "+ pageUser.name:
                            "Ваше имя: " + currentUser.name}
                        </h4>
                        <h5>{pageUser.name && currentUser.newUser ? "Поздравляем с регистрацией": ""}
                        </h5>
                        <Teams/>
                        <Federations/>
                        {ModalWin}
                    </div>
                </div>
            </div>
        )     
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser,
        pageUser: state.pageUser,
        federations: state.federations
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    }
})(Component);