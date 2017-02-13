import React from 'react';
import SubscribeButton from '../components/federation/SubscribeButton';
import List from '../components/common/List';
import Stream from '../components/federation/Stream';
import Setting from '../components/federation/Setting';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as federationActions from '../actions/federation';
import * as userActions from '../actions/user';
import CreateTournament from '../components/federation/CreateTournament';

var Component = React.createClass({
    getInitialState: function() {
        return {srcBanner: '/img/default-federation-banner.png'};
    },
    fetch: function (federationName) {
        this.props.federationActions
            .getFederationInfo(federationName);
        this.props.federationActions
            .getTournamentsInFederation(federationName);
    },
    componentDidMount: function () {
        this.fetch(this.props.params.federationName);
    },
    componentDidUpdate: function () {
        $('ul.tabs').tabs();
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.params.federationName !== nextProps.params.federationName) {
            this.fetch(nextProps.params.federationName)
        }
        this.setState({srcBanner: `/uploaded/federation/banner/${nextProps.federation._id}.png`});
    },
    federationBannerNotFound: function() {
        this.setState({srcBanner: '/img/default-federation-banner.png'});
    },
    render: function () {
        var federation = this.props.federation;
        var isAdmin = federation.isAdmin;
        var channel = String(this.props.federation._id).substring(19);
        return (
            <div className="row">
                <div className="col s12 card padding-disabled">
                    <div className="card-image tournament_card-title">
                        <img src={this.state.srcBanner}
                             className="banner_limits-size"
                             onError={this.federationBannerNotFound}/>
                    </div>

                    <div className="card-content">
                        <span className="card-title">
                            Федерация {federation.name}
                        </span>

                        <SubscribeButton federation={this.props.federation}
                                         currentUser={this.props.currentUser}
                                         addCurrentUserFederation={this.props.userActions.addCurrentUserFederation}
                                         removeCurrentUserFederation={this.props.userActions.removeCurrentUserFederation}
                                         getFederationInfo={this.props.federationActions.getFederationInfo}/>
                    </div>

                    <ul className="tabs tabs-fixed-width tabs_border-top">
                        <li className="tab col s3"><a className="active js-link" href="#tab-id-2">Турниры</a></li>
                        <li className="tab col s3"><a href="#tab-id-3" className="js-link">Прямой эфир</a></li>
                        {!isAdmin ? null :
                            <li className="tab col s3"><a href="#tab-id-4" className="js-link">Настройки</a></li>
                        }
                    </ul>
                </div>

                <div id="tab-id-2" className="col s12 padding-disabled">
                    <List url="/tournament/"
                          defaultMessage="Турниров нет"
                          list={this.props.tournaments}/>

                        {!this.props.federation.isAdmin ? null :
                            <CreateTournament federation={this.props.federation}
                                              history={this.props.history}/>
                        }
                </div>

                <div id="tab-id-3" className="col s12 card padding-disabled">
                    <Stream channel={channel} />
                </div>

                {!isAdmin? null:
                    <div id="tab-id-4" className="col s12 padding-disabled">
                        <Setting federationId={this.props.federation._id}
                                 channel={channel} />
                    </div>
                }
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
        federationActions: bindActionCreators(federationActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
})(Component);
