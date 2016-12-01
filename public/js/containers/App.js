import React from 'react';
import * as accountActions from '../actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Nav from '../components/common/Nav';
import LeftMenu from './LeftMenu';

var App = React.createClass({
    componentDidMount: function () {
        $("#preloader").hide();
        this.props.accountActions.getCurrentUser();
    },
    render: function () {
        return (
            <div>
                <Nav location={this.props.location}
                     history={this.props.history}/>
                <div className="row">
                    <div className="col s2-5 card-padding">
                        <div>
                            <LeftMenu history={this.props.history}/>
                        </div>
                    </div>

                    <div className="col s9-5 card-padding">
                            {this.props.children}
                    </div>
                </div>
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