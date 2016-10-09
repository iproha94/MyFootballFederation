import ModalForm from './ModalForm';
import React from 'react';

export default React.createClass({
    onClickModal: function(event){
        event.preventDefault();
        this.props.getTeams();
    },
    onClickModalAction: function(event) {
        $.ajax({
            type: 'POST',
            data: $(".js-modal-form").serialize(),
            url: 'add-team/',
            success: function(data){
                Materialize.toast("Команда успешно добавлена", 2000);
            },
            error: function () {
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    componentDidMount: function () {
        $('.modal-trigger').leanModal();
        $('select').material_select();
    },
    render: function () {
        return (
            <div>
                <a onClick={this.onClickModal} className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.header}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.inputName}</h4>
                        <p className="js-modal-body">
                            <ModalForm teams={this.props.teams}/>    
                        </p>
                    </div>
                    
                    <div className="modal-footer">
                        <a href="#!" onClick={this.onClickModalAction} className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
                </div>
            </div>
        );
    }
});
