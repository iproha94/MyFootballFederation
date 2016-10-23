import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as matchActions from '../actions/match';
import * as federationActions from '../actions/federation';
import Chat from '../components/match/Chat';
import * as usersActions from '../actions/user';
import List from '../components/common/List';
import ModalWindow from '../components/common/ModalWindow';


var Component = React.createClass({
    componentDidMount: function() {
        this.props.matchActions.getMatch(this.props.params.idMatch);
        this.props.federationActions.getFederationByMatch(this.props.params.idMatch);
        this.props.usersActions.getAllUser();
    },
    onSuccessAddReferee: function () {
        this.props.matchActions.getMatch(this.props.params.idMatch);
    },
    render: function () {//какого то хрена team1 и team2 - это idшники
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

                {!this.props.match.isFederationCreator ? "" :
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
                <Chat idMatch={this.props.params.idMatch}/>
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
        usersActions: bindActionCreators(usersActions, dispatch),
        federationActions: bindActionCreators(federationActions, dispatch)
    }
})(Component);