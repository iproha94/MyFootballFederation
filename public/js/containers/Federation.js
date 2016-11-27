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

                <List header="Турниры:"
                      url="/tournament/"
                      defaultMessage="Турниров нет"
                      list={this.props.tournaments}/>
                {!this.props.federation.isAdmin ? null :
                    <div className="row right-align">
                        <Link className="waves-effect waves-light btn"
                              to={"/tournament/create/?federation=" + federation.name}>
                            Создать турнир
                        </Link>
                    </div>
                }

                {!this.props.currentUser._id ? null: (
                    this.props.federation.members.includes(this.props.currentUser._id) ?
                        <a className="waves-effect waves-light btn" onClick={this.unsubscribeFederation}>Отписаться от федерации</a>:
                        <a className="waves-effect waves-light btn" onClick={this.subscribeFederation}>Подписаться на федерацию</a>
                    )
                }

                <List header="Подписчики"
                      url="/account/"
                      defaultMessage="На эту федерацию ни кто не подписан"
                      list={this.props.federation.membersWithName}/>


                <List header="Идущие сейчас матчи:"
                      url="/match/"
                      defaultMessage="Нет идущих матчей"
                      list={this.props.federation.runningMatches}/>
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