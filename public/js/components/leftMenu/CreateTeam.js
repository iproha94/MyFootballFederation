import React from 'react';
import * as teamActions from '../../actions/team';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';

var Component = React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    handleSubmit: function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data:$(ReactDOM.findDOMNode(this.refs.form)).serialize(),
            url: "/api/team/create",
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.updateTextFields();
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.teamActions.addTeamCurrentUser(data.payload);
                this.props.history.push('/team/' + data.payload._id);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    onClickStart: function () {
        $('select').material_select();
    },
    render: function () {
        return (
            <div>
                <div id="modal-team" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание команды</h4>
                        <div className="row">
                            <form className="col s12 js-form create__padding js-form"
                                  ref="form"
                                  id="form-create-team"
                                  onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="team-name" type="text" className="validate" name="name" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                            <label for="name">Название команды</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="team-city" type="text" className="validate" name="city" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                            <label for="city">Город</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    
                    <div className="modal-footer">
                        <button id="send-team-btn"
                                form="form-create-team"
                                type="submit"
                                className="modal-action modal-close waves-effect waves-green btn-flat ">
                            Добавить
                        </button>
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
        teamActions: bindActionCreators(teamActions, dispatch)
    }
})(Component);