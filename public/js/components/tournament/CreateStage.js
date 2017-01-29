import React from 'react';
import * as stageActions from '../../actions/stage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';

var Component = React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    onClickModalAction: function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(ReactDOM.findDOMNode(this.refs.form)).serialize(),
            url: `/api/stage/create/?tournament=${this.props.tournamentId}`,
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.updateTextFields();
                console.log(data);
                Materialize.toast(data.message || "Этап успешно создан", 2000);
                this.props.stageActions.getStages(this.props.tournamentId);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        return (
            <div>
                <div id="modal-stage" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание этапа</h4>
                        <div className="row">
                            <form className="col s12 js-form create__padding js-form" ref="form" method="post" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" className="validate" name="name" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                        <label for="name">Название этапа</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <a href="#!" onClick={this.onClickModalAction} className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
                </div>

                <a className="modal-trigger waves-effect waves-light btn width-fullscreen"
                   href="#modal-stage">Создать</a>
            </div>
        );
    }
});


export default connect((state)=>{
    return {}
}, (dispatch)=>{
    return {
        stageActions: bindActionCreators(stageActions, dispatch)
    }
})(Component);