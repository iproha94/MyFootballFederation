import ModalForm from './ModalForm';
import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as teamsActions from '../../actions/tournament/TeamsActions';

var ModalWindow = React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
        this.props.teamsActions.getTeams();
    },
    onClickModalAction: function(event) {
        console.log(event._targetInst);
        var dataForm = $(".js-modal-form").serialize();
        console.log(dataForm);
        $.ajax({
            data: dataForm,
            url: '/tournament/add-team',
            success: function(data){
                console.log(data);
                Materialize.toast("Команда успешно добавлена", 2000);
            },
            error: function (jqXHR,textStatus,errorThrown) {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
        this.props.teamsActions.addTeamsInTournament(this.props.data.id);
    },
    render: function () {
        return (
            <div>
                <a className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.header}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.inputName}</h4>
                        <ModalForm/>
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
    return {
        teams: state.teams
    }
}, (dispatch)=>{
    return {
        teamsActions: bindActionCreators(teamsActions, dispatch)
    }
})(ModalWindow);
