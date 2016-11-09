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
                this.props.matchActions.getMatch(this.props.idMatch);
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
                <div>
                    <input type='checkbox' defaultChecked={false} ref={"player"+item._id} name="players[]" value={item._id}/>
                    <label for={"player"+item._id} onClick={this.handleChange} data-ref={"player"+item._id}>{item.name}</label>
                </div>
            );
        });

        return players.length ? (
            <form action="#" ref="form" onSubmit={this.onSubmit} >
                {players}
                <input type="hidden" name="idMatch" value={this.props.idMatch}/>
                <input type="hidden" name="idTeam" value={this.props.team._id}/>
                <button className="btn waves-effect waves-light" type="submit">Заявить список игроков
                    <i className="material-icons right">send</i>
                </button>
            </form>
        ) : null;
    }
});

export default connect((state)=>{
    return {}
}, (dispatch)=>{
    return {
        matchActions: bindActionCreators(matchActions, dispatch)
    }
})(Component);