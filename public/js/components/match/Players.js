import React from 'react';
import {connect} from 'react-redux';
import * as matchActions from '../../actions/match';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';

var Component = React.createClass({
    handleChange: function (event) {
        var input = ReactDOM.findDOMNode(this.refs[event.target.dataset.ref]);
        input.checked = !input.checked;
    },
    onSubmit: function(event) {
        event.preventDefault();
        $.ajax({
            data: $(ReactDOM.findDOMNode(this.refs["form"])).serialize(),
            url: "/api/match/set-players",
            success: (data) => {
                console.log(data);
                Materialize.toast("Операция прошла успешно", 2000);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        var players = this.props.team.vplayers.map((item, index) => {
            return (
                <p>
                    <input type='checkbox' defaultChecked={false} ref={"player"+index} name="players[]" value={item}/>
                    <label for={"player"+index} onClick={this.handleChange} data-ref={"player"+index}>{item}</label>
                </p>
            );
        });

        return players.length ? (
            <form action="#" ref="form" onSubmit={this.onSubmit} >
                {players}
                <input type="hidden" name="idMatch" value={this.props.idMatch}/>
                <input type="hidden" name="idTeam" value={this.props.team._id}/>
                <button class="btn waves-effect waves-light" type="submit" name="action">Отправить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        ) : null;
    }
});

export default connect((state)=>{
    return {
        team: state.match.currentUserTeam
    }
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);