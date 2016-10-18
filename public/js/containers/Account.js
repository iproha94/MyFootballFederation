import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWindow from '../components/common/ModalWindow';
import * as federationsActions from '../actions/federation';
import * as teamsActions from '../actions/team';
import List from '../components/common/List';
import {Link} from 'react-router';
import Chart from '../components/common/Chart';

var Component = React.createClass({
    componentDidMount: function () {
        //'/account/get-creator/'
        this.props.accountActions.getUserById(this.props.params.idUser);
        this.props.teamsActions.getTeams();
        this.props.federationsActions.getFederations();
    },
    onSuccessAddUser: function () {
        this.props.federationsActions.getFederations();
    },
    render: function () {
        var currentUser = this.props.currentUser;
        var user = this.props.pageUser;
        var isOwnPage = (currentUser._id == user._id);
        return (
            <div>
                <div className="container content-margin-top content-flex">
                    <div className="center">
                        <h3>Страница пользователя</h3>
                        <h4>{isOwnPage ? "Имя пользователя: "+ user.name:
                            "Ваше имя: " + currentUser.name}
                        </h4>
                        <h5>{isOwnPage && currentUser.newUser ? "Поздравляем с регистрацией": ""}
                        </h5>

                        <List header="Команды"
                              url="/team/"
                              defaultMessage="Команд нет"
                              list={this.props.teams}/>
                        <Link to="/team/create" className="waves-effect waves-light btn">button</Link>

                        <List header="Федерации"
                              url="/federation/"
                              defaultMessage="Федераций нет"
                              urlParam="name"
                              list={this.props.federations}/>
                        <Link to="/federation/create" className="waves-effect waves-light btn">button</Link>

                        <Chart/>
                        
                        <div className="row content-margin-top">
                            {isOwnPage ? ""
                                :
                                <ModalWindow urlSend="/api/account/add-creator/"
                                             buttonName="Добавить пользователя в организаторы"
                                             header="Список федераций"
                                             nameHiddenInput="idUser"
                                             valueArray={this.props.federations}
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
        pageUser: state.pageUser,
        federations: state.federations,
        teams: state.teams
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch),
        teamsActions: bindActionCreators(teamsActions, dispatch),
        federationsActions: bindActionCreators(federationsActions, dispatch),
    }
})(Component);