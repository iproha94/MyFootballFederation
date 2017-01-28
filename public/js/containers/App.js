import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Nav from '../components/common/Nav';
import LeftMenu from './LeftMenu';
import CreateFederation from '../components/leftMenu/CreateFederation';
import CreateTeam from '../components/leftMenu/CreateTeam';

var App = React.createClass({
    componentDidMount: function () {
        $("#preloader").hide();
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        var isAuth = !!this.props.currentUser._id;
        return (
            <div>
                <Nav federations={this.props.currentUser.federations}
                     teams={this.props.currentUser.teams}
                     location={this.props.location}
                     history={this.props.history}/>

                <div className="row">
                    {!isAuth ? null :
                        <div className="col s12 m4 l3 card-padding hide-on-med-and-down">
                            <div>
                                <LeftMenu federations={this.props.currentUser.federations}
                                          teams={this.props.currentUser.teams}
                                          history={this.props.history}/>
                            </div>
                        </div>
                    }

                    <div className={`col card-padding ${isAuth ? "s12 m12 l9 m-padding" : "s12 m12 l12 custom-container"}`}>
                            {this.props.children}
                    </div>
                </div>

                <CreateTeam history={this.props.history}/>
                <CreateFederation history={this.props.history}/>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        accountActions: bindActionCreators(accountActions, dispatch)
    }
})(App);