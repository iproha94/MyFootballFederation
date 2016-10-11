import React from 'react';
import {connect} from 'react-redux';

var ModalForm = React.createClass({
    componentWillUpdate: function () {
        $('select').material_select();
    },
    render: function () {
        var options = this.props.teams.map(function (item) {
            return (
                <option key={item._id} value={item._id}>
                    {item.name}
                </option>
            )
        });
        
        return (
            <div>
                <form className="js-modal-form">
                    <input type="hidden" name="idTournament" value={this.props.tournament._id}/>
                    <div className="input-field col s12">
                        <select name="idTeam">
                            {options}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
});

export default connect((state)=>{
    return {
        tournament: state.tournament,
        teams: state.teams
    }
})(ModalForm);