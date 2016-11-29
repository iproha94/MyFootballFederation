import React from 'react';
import * as federationsActions from '../actions/federation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var Component = React.createClass({
    handleSubmit: function (event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(".js-form").serialize(),
            url: "/api/federation/create",
            success: (data) => {
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.federationsActions.addFederationCurrentUser(data.payload);
                this.props.history.push('/federation/' + data.payload.name);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        return (
            <div className="container content-flex">
                <div className="row">
                    <form className="col s12 js-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" name="name" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                    <label for="name">Имя федерации</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="city" type="text" className="validate" name="city" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                    <label for="city">Город</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
});

export default connect((state)=>{
    return {}
}, (dispatch)=>{
    return {
        federationsActions: bindActionCreators(federationsActions, dispatch)
    }
})(Component);