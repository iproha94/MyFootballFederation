import React from 'react';
import CreateFederationButton from './CreateFederationButton';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState: function() {
        return {nowBanner: '/img/default-federation-banner.png'};
    },
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    setFederationBanner: function(id) {
        this.setState({nowBanner: `/uploaded/federation/banner/${id}.png`});
    },
    resetFederationBanner: function() {
        this.setState({nowBanner: '/img/default-federation-banner.png'});
    },
    render: function () {
        var myFederations = this.props.federations.map((item) => {
            let boundSetFederationBanner = this.setFederationBanner.bind(this, item._id);
            return (
                <Link key={item._id}
                      onMouseLeave={this.resetFederationBanner}
                      onMouseEnter={boundSetFederationBanner}
                      to={"/federation/" + item.name}
                      className="truncate collection-item">
                    {item.name}
                </Link>
            )
        });
        return (
            <div className="card">
                <div className="card-image">
                    <img  src={this.state.nowBanner}
                          onError={this.resetFederationBanner}
                          className="left-menu_banner" />
                    <a id="create-federation-btn"
                       href="#modal-federation"
                       className="modal-trigger btn-floating halfway-fab btn-large waves-effect waves-light red">
                        <i className="material-icons">add</i>
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title">Мои федерации</span>
                </div>
                <div className="collection left-menu-padding_card enabled-border-top border-none">
                    {myFederations.length ? myFederations : ""}
                </div>
            </div>
        )
    }
});
