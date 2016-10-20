import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWindow from '../components/common/ModalWindow';
import * as federationsActions from '../actions/federation';
import List from '../components/common/List';
import {Link} from 'react-router';
import Chart from '../components/common/Chart';

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
    render: function () {
        var currentUser = this.props.currentUser;
        var user = this.props.pageUser;
        var isAuth = !!currentUser._id;
        var isOwnPage = (currentUser._id == user._id);
        return (
                <div>
                <div className="container content-margin-top content-flex">
                    <div className="center">
                        <h3>Страница пользователя</h3>
                        <h4>{isOwnPage ? "Ваше имя: " + currentUser.name:
                                        "Имя пользователя: "+ user.name}
                        </h4>
                        <h5>{isOwnPage && currentUser.newUser ? "Поздравляем с регистрацией": ""}
                        </h5>

                        <List header="Команды"
                              url="/team/"
                              defaultMessage="Команд нет"
                              list={this.props.pageUser.teams}/>
                        {isOwnPage ? <Link to="/team/create" className="waves-effect waves-light btn">Создать команду</Link> : ""}


                        <List header="Федерации"
                              url="/federation/"
                              defaultMessage="Федераций нет"
                              urlParam="name"
                              list={this.props.pageUser.federations}/>
                        {isOwnPage ? <Link to="/federation/create" className="waves-effect waves-light btn">Создать федерацию</Link> : ""}

                        <Chart/>
                        
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