import React from 'react';
import Tournaments from '../components/federation/Tournaments';
import Info from '../components/federation/Info';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as federationActions from '../actions/federation';

var Component = React.createClass({
    fetch: function (federationName) {
        this.props.federationActions
            .getFederationInfo(federationName);
        this.props.federationActions
            .getTournamentsInFederation(federationName);
    },
    componentDidMount: function () {
        $('ul.tabs').tabs();
        this.fetch(this.props.params.federationName);
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.params.federationName !== nextProps.params.federationName) {
            this.fetch(nextProps.params.federationName)
        }
    },
    render: function () {
        var federation = this.props.federation;

        return (
            <div className="row" >
                <div className="col s12 card padding-enabled">
                    <div className="card-image">
                        <img src="http://www.drodd.com/images13/football-wallpapers.jpg"/>
                        <span className="card-title">
                            Страница федерации {federation.name}
                        </span>
                    </div>

                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s3"><a href="#tab-id-1" className="js-link">Инфо</a></li>
                        <li className="tab col s3"><a className="active js-link" href="#tab-id-2">Турниры</a></li>
                        <li className="tab col s3"><a href="#tab-id-3" className="js-link">Организаторы</a></li>
                    </ul>
                </div>
                
                <div id="tab-id-1" className="col s12 card">
                    <Info federation={this.props.federation}
                          currentUser={this.props.currentUser}
                          getFederationInfo={this.props.federationActions.getFederationInfo}/>
                </div>
                <div id="tab-id-2" className="col s12 card">
                    <Tournaments federation={this.props.federation}
                                 tournaments={this.props.tournaments}/>
                </div>
                <div id="tab-id-3" className="col s12 card">
                    Организаторы
                </div>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        federation: state.federation,
        tournaments: state.federation.tournaments,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        federationActions: bindActionCreators(federationActions, dispatch)
    }
})(Component);
