import React from 'react';
import * as federationsActions from '../../actions/federation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';

var Component = React.createClass({
    onClickModalAction: function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(ReactDOM.findDOMNode(this.refs.form)).serialize(),
            url: "/api/federation/create",
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.updateTextFields();
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.federationsActions.addFederationCurrentUser(data.payload);
                this.props.history.push('/federation/' + data.payload.name);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR, textStatus ,errorThrown);
                Materialize.toast(jqXHR.responseJSON.message ||
                    "Что то не так", 2000);
            }
        });
    },
    onClickStart: function () {
        $('select').material_select();
    },
    render: function () {
        return (
            <div>
                <div id="modal-federation" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание Федерации</h4>
                        <div className="row">
                            <form className="col s12 js-form" method="post" ref="form" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="name"  type="text" className="validate" name="name" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                            <label for="name">Имя федерации</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="city" type="text" className="validate" name="city" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                            <label for="city">Город</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    
                    <div className="modal-footer">
                        <a href="#!" onClick={this.onClickModalAction} className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
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