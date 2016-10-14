import ModalForm from './ModalForm';
import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    onClickModalAction: function(event) {
        $.ajax({
            data: $(".js-modal-form").serialize(),
            url: this.props.urlSend,
            success: function(data){
                console.log(data);
                Materialize.toast("Операция прошла успешно", 2000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    onclickf: function () {
        $('select').material_select();
    },
    render: function () {
        return (
            <div>
                <a onClick={this.onclickf} className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.buttonName}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.header}</h4>
                        <ModalForm valueArray={this.props.valueArray}
                                   nameHiddenInput={this.props.nameHiddenInput}
                                   valueHiddenInput={this.props.valueHiddenInput}/>
                    </div>

                    <div className="modal-footer">
                        <a href="#!" onClick={this.onClickModalAction} className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
                </div>
            </div>
        );
    }
});

