import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    handleSubmit: function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data:$(ReactDOM.findDOMNode(this.refs.form)).serialize(),
            url: "/api/team/add-vuser",
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.updateTextFields();
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.teamActions.getTeamInfo(this.props.team._id);
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
                <div>
                    <a onClick={this.onClickStart} className="modal-trigger waves-effect waves-light btn"
                       href="#modal-vuser">Создать</a>
                </div>

                <div id="modal-vuser" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание игрока</h4>

                        <div className="row">
                            <form className="col s12 js-form create__padding js-form"
                                  ref="form"
                                  id="form-create-vuser"
                                  onSubmit={this.handleSubmit}>

                                <input name="team" value={this.props.team._id} type="hidden"/>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="firstName" type="text" className="validate" name="firstName" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                        <label for="firstName">Имя</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="lastName" type="text" className="validate" name="lastName" required pattern="[a-zA-Z0-9а-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_\s]*"/>
                                        <label for="lastName">Фамилия</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button  form="form-create-vuser"
                                 type="submit"
                                 className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</button>
                    </div>
                </div>
            </div>
        );
    }
});