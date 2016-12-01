import React from 'react';
import * as teamActions from '../actions/team';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var Component = React.createClass({
    handleSubmit: function (event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(".js-form").serialize(),
            url: "/api/team/create",
            success: (data) => {
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
    render: function () {
        return (
            <div className="container content-flex">
                <div className="row">
                    <div className="col s5">
                        <h4 className="brown-text">Создание федерации</h4>
                    </div>
                    <form className="col s7 js-form card create__padding" method="post" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" name="name" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                    <label for="name">Название команды</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="city" type="text" className="validate" name="city" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                    <label for="city">Город</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="motto" type="text" className="validate" name="motto" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                    <label for="motto">Девиз</label>
                            </div>
                        </div>
                        <div className="row right">
                            <button className="btn waves-effect waves-light create_button__margin" type="submit">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
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
        teamActions: bindActionCreators(teamActions, dispatch)
    }
})(Component);