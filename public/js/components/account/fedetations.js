import React from 'react';
import * as federationsActions from '../../actions/federation/federations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var Federations = React.createClass({
    componentDidMount: function () {
        this.props.federationsActions.getFederations();
    },
    render: function () {
        var federations = this.props.federations.map(function (item) {
            return (
                <li className="collection-item" key={item._id}>
                    <div>
                        {item.name}
                        <a href={"/team/" + item._id} className="secondary-content">
                            <i className="material-icons">send</i>
                        </a>
                    </div>
                </li>
            )
        });

        if(!this.props.pageUser.name) {
            var buttonCreateFederation = (
                <li className="collection-item right">
                    <a className="btn-floating btn-large waves-effect waves-light red" href="/federation/create"><i className="material-icons">add</i></a>
                </li>
            )
        }

        return (
            <ul className="collection with-header">
                <li className="collection-header center"><h5>Федерации</h5></li>
                {federations.length ? federations : "Пользователь не состоит в федерациях"}
                {buttonCreateFederation}
            </ul>
        );
    }
});

export default connect((state)=>{
    return {
        federations: state.federations,
        pageUser: state.pageUser
    }
}, (dispatch)=>{
    return {
        federationsActions: bindActionCreators(federationsActions, dispatch)
    }
})(Federations);

