import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../actions/match';
import Chat from '../components/match/Chat';
import Events from '../components/match/Events';
import * as usersActions from '../actions/user';
import List from '../components/common/List';
import ModalWindow from '../components/common/ModalWindow';
import Players from '../components/match/Players';


var Component = React.createClass({
    componentDidMount: function() {
        this.props.matchActions.getMatch(this.props.params.idMatch);
        this.props.usersActions.getAllUser();
    },
    onSuccessAddReferee: function () {
        this.props.matchActions.getMatch(this.props.params.idMatch);
    },
    render: function () {
        return (
            <div className="container content-margin-top content-flex">
                <p>
                    Страница матча {this.props.match.team1.name}
                        - {this.props.match.team2.name}
                </p>

                <List header="Список судей"
                      url="/account/"
                      defaultMessage="Судья не назначен"
                      list={this.props.match.refereeList}/>

                {!this.props.match.isAdmin ? null :
                    <div className="container">
                        <ModalWindow urlSend='/api-referee/add-referee'
                                     buttonName="Добавить судью"
                                     header="Список пользователей"
                                     nameHiddenInput="idMatch"
                                     valueArray={this.props.usersList}
                                     valueHiddenInput={this.props.match._id}
                                     onSuccess={this.onSuccessAddReferee}/>
                    </div>
                }

                <List header="Список игроков команды 1"
                      url="/vuser/"
                      defaultMessage="Нет игроков"
                      list={this.props.match.players1}/>
                
                <List header="Список игроков команды 2"
                      url="/vuser/"
                      defaultMessage="Нет игроков"
                      list={this.props.match.players2}/>
                
                <Players idMatch={this.props.params.idMatch}/>
                <Events/>
                <Chat/>
            </div>

        )
    }
});

export default connect((state)=>{
    return {
        match: state.match,
        usersList: state.usersList
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch),
        usersActions: bindActionCreators(usersActions, dispatch)
    }
})(Component);