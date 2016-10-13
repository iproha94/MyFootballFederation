import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as federationActions from '../actions/federation/federations';

var Component = React.createClass({
    componentDidMount: function () {
        this.props.federationActions
            .getFederationInfo(this.props.params.federationName);
        this.props.federationActions
            .getTournamentsInFederation(this.props.params.federationName);
    },
    render: function () {
        var tournaments = this.props.tournamentList.map(function (item) {
           return (
               <a href={"/tournament/" + item._id} className="collection-item">{item.name} : </a>
           )
            //{item.status} - с сервера не приходит, и react
        });
        var buttonCreateTournament = (
            <div className="row right-align">
                <a className="waves-effect waves-light btn" href="/tournament/create/?federation={{federation.name}}">Создать турнир</a>
            </div>
        );
        console.log(this.props.federation.creators);
        console.log('asdfa',this.props.currentUser._id);
        if(!this.props.federation.creators.includes(this.props.currentUser._id)) {
            buttonCreateTournament = "";
        }
        var federation = this.props.federation;
        return (
            <div className="container content-margin-top content-flex">
                <div className="row center">
                    Страница федерации {federation.name}
                </div>
                <div className="row">
                    <div className="tournament-list_header">
                        Список турниров:
                    </div>
                    <div className="collection">
                        {tournaments}
                    </div>
                </div>
                {buttonCreateTournament}
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        federation: state.federation,
        tournamentList: state.tournamentList,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        federationActions: bindActionCreators(federationActions, dispatch)
    }
})(Component);