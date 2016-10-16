import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as federationActions from '../actions/federation';
import List from '../components/common/List';
import {Link} from 'react-router';

var Component = React.createClass({
    componentDidMount: function () {
        this.props.federationActions
            .getFederationInfo(this.props.params.federationName);
        this.props.federationActions
            .getTournamentsInFederation(this.props.params.federationName);
    },
    render: function () {
        var federation = this.props.federation;

        if(!federation.creators.includes(this.props.currentUser._id)) {
            var buttonCreateTournament = "";
        } else {
            var buttonCreateTournament =
                <div className="row right-align">
                    <Link className="waves-effect waves-light btn"
                       to={"/tournament/create/?federation=" + federation.name}>
                        Создать турнир
                    </Link>
                </div>
        }

        return (
            <div className="container content-margin-top content-flex">
                <div className="row center">
                    Страница федерации {federation.name}
                </div>
                
                <div className="container content-margin-top content-flex">
                    <ul className="collection with-header">
                        <li className="collection-header center"><h5>Параметры федерации</h5></li>

                        <li className="collection-item">Город: {federation.city}</li>
                    </ul>
                </div>
                
                <div className="row">
                    <List header="Турниры:"
                          url="/tournament/"
                          defaultMessage="Турниров нет"
                          list={this.props.tournamentList}/>
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