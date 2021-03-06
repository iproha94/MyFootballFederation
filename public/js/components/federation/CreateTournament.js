import React from 'react';
import * as federationActions from '../../actions/federation';
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
            url: "/api/tournament/create",
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.updateTextFields();
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                // this.props.federationActions.getFederationInfo(this.props.federation.name);
                this.props.history.push('/tournament/' + data._id);
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
                <a className="floating-add-button_margin right modal-trigger btn-floating btn-large waves-effect waves-light red"
                   onClick={this.onClickStart}
                   href="#modal-tournament">
                    <i className="material-icons">add</i>
                </a>

                <div id="modal-tournament" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание турнира</h4>
                        <div className="row">
                            <form className="col s12 js-form create__padding js-form"
                                  ref="form"
                                  id="form-create-tournament"
                                  onSubmit={this.handleSubmit}>
                                <input name="federation" value={this.props.federation.name} type="hidden"/>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="name" type="text" className="validate" name="name" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                        <label for="name">Название турнира</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field  col s12">
                                        <input id="time" type="text" className="validate" defaultValue="7" name="countPlayersOnField" required pattern="[0-9]*"/>
                                        <label className="active" for="time">Колличество игроков на поле от команды</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field  col s12">
                                        <input id="time" type="text" className="validate" defaultValue="16" name="countPlayersInTeam" required pattern="[0-9]*"/>
                                        <label className="active" for="time">Колличество заявленных игроков в команде</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field  col s12">
                                        <input id="time" type="text" className="validate" defaultValue="25" name="timePeriod" required pattern="[0-9]*"/>
                                        <label className="active" for="time">Длительность периода [мин]</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field  col s12">
                                        <input id="countPeriods" type="text" defaultValue="2" className="validate" name="countPeriods" required pattern="[0-9]*"/>
                                        <label className="active" for="countPeriods">Количество периодов</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button form="form-create-tournament"
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
        federationActions: bindActionCreators(federationActions, dispatch)
    }
})(Component);