import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWindow from '../components/common/ModalWindow';
import * as federationsActions from '../actions/federation';
import List from '../components/common/List';
import {Link} from 'react-router';
import Chart from '../components/common/Chart';
import ReactDOM from 'react-dom';

var Component = React.createClass({
    componentDidMount: function () {
        this.props.accountActions.getUserById(this.props.params.idUser);
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.params.idUser !== nextProps.params.idUser) {
            this.props.accountActions.getUserById(nextProps.params.idUser);
        }
    },
    onSuccessAddUser: function () {
        this.props.federationsActions.getFederationsUser(this.props.params.idUser);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(event.target).serialize(),
            url: "/api/account/save-change/",
            success: (data) => {
                Materialize.toast("Изменения успешно сохранены", 2000);
                this.props.accountActions.getCurrentUser();

            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    handleChange: function (event) {
        var input = ReactDOM.findDOMNode(this.refs.checkbox);
        input.checked = !input.checked;
    },
    render: function () {
        var currentUser = this.props.currentUser;
        var user = this.props.pageUser;
        var isAuth = !!currentUser._id;
        var isOwnPage = (currentUser._id == user._id);
        return (
            <div className="row">
                <div className="col s12 card account-page__padding">
                    <div>
                        <h4>{isOwnPage ? "Ваш профиль " + currentUser.name:
                                        "Профиль пользователя: "+ user.name}
                        </h4>
                        <h5>{isOwnPage && currentUser.newUser ? "Поздравляем с регистрацией": ""}
                        </h5>


                        {!isOwnPage ? null :
                            <form className="col s12" method="post" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s6">
                                            <input id="email" type="email" className="validate" defaultValue={this.props.currentUser.email} name="email"/>
                                            <label for="email" className={this.props.currentUser.email ? "active" : null}>Email</label>
                                    </div>
                                </div>
                                <div className="row"> 
                                    <div className="col">
                                        <input type="checkbox" id="test5" defaultChecked={this.props.currentUser.notifications} ref="checkbox" name="notifications"/>
                                        <label for="test5" onClick={this.handleChange}>Присылать письма уведомления</label>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light" type="submit">Сохранить изменения
                                    <i className="material-icons right">send</i>
                                </button>
                            </form>
                        }

                        <div className="row content-margin-top">
                            {isOwnPage || !isAuth ? "" :
                                <ModalWindow urlSend="/api/account/add-creator/"
                                             buttonName="Добавить пользователя в организаторы"
                                             header="Список федераций"
                                             nameHiddenInput="idUser"
                                             valueArray={this.props.currentUser.federations}
                                             valueHiddenInput={user._id} onSuccess={this.onSuccessAddUser}/>
                            }
                        </div>
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
        accountActions: bindActionCreators(accountActions, dispatch),
        federationsActions: bindActionCreators(federationsActions, dispatch)
    }
})(Component);