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
        this.fetch(this.props.params.federationName);
    },
    componentWillReceiveProps: function (nextProps) {
        console.log(this.props.params.federationName,nextProps.params.federationName)
        if(this.props.params.federationName !== nextProps.params.federationName) {
            this.fetch(nextProps.params.federationName)
        }
    },
    subscribeFederation: function () {
        $.ajax({
            url: "/api/federation/subscribe/" + this.props.params.federationName,
            success: (data) => {
                Materialize.toast("Вы успешно подписались на федерацию", 2000);
                this.props.federationActions
                    .getFederationInfo(this.props.params.federationName);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    unsubscribeFederation: function () {
        $.ajax({
            url: "/api/federation/unsubscribe/" + this.props.params.federationName,
            success: (data) => {
                Materialize.toast("Вы успешно отписались от федерации", 2000);
                this.props.federationActions
                    .getFederationInfo(this.props.params.federationName);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        var federation = this.props.federation;

        return (
            <div className="row" >
                    <div className="col s12 card padding-enabled">
                        <div className="card-image">
                            <img src="http://www.drodd.com/images13/football-wallpapers.jpg"/>
                            <span className="card-title">
                                Страница федерации {federation.name} Город: {federation.city}
                            </span>
                        </div>

                        <ul className="tabs tabs-fixed-width" id="delete">
                            <li className="tab col s3"><a href="#testt1" className="js-link">Инфо</a></li>
                            <li className="tab col s3"><a className="active js-link" href="#testt2">Турниры</a></li>
                            <li className="tab col s3"><a href="#testt4" className="js-link">Организаторы</a></li>
                        </ul>
                    </div>

                <div id="testt1" className="col s12 card">
                    <Info federation={this.props.federation}
                          tournaments={this.props.tournaments}
                          currentUser={this.props.currentUser}/>
                </div>
                <div id="testt2" className="col s12 card">
                    <Tournaments federation={this.props.federation}
                                 tournaments={this.props.tournaments}
                                 currentUser={this.props.currentUser}/>
                </div>
                <div id="testt4" className="col s12 card">
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
