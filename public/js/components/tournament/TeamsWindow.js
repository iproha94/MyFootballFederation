import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    handleChange: function (event) {
        var input = ReactDOM.findDOMNode(this.refs[event.target.dataset.ref]);
        input.checked = !input.checked;
    },
    validationForm: function (form) {
        var countTeam = 0;
        for(var team of form.elements["idSend"]) {
            if(team.checked) {
                countTeam++;
            }
        }

        return countTeam > 0;
    },
    handleSubmit: function(event) {
        event.preventDefault();

        var form = ReactDOM.findDOMNode(this.refs.form);
        if(!this.validationForm(form)) {
            Materialize.toast("Выберете команду", 2000);
            return;
        }

        $.ajax({
            data: $(form).serialize(),
            url: "/api/tournament/add-team",
            success: (data) => {
                console.log(data);
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.teamActions.getTeamsByTournament(this.props.tournamentId);
                $(form)[0].reset();
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        var teams = this.props.teams.map((item, index) => {
            return (
                <p>
                    <input name="idSend"
                           defaultChecked={false}
                           type="radio"
                           ref={"team-request"+item._id}
                           value={item._id}
                           id={"team-request"+item._id} />
                    <label onClick={this.handleChange}
                           data-ref={"team-request"+item._id}
                           for={"team-request"+item._id}>{
                        item.name}
                    </label>
                </p>
            );
        });
        //idSend
        var modalId = `modal-team-request`;
        var formId = `form-request-team`;
        return (
            <div>
                <div id={modalId} key={modalId} className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Подать заявку</h4>
                        <div className="row">
                            <form className="col s12 create__padding"
                                  ref='form'
                                  id={formId}
                                  onSubmit={this.handleSubmit}>
                                <div className="teams-select-header">Выберете команду:</div>
                                {teams}
                                <input type="hidden" name="idTournament" value={this.props.tournamentId}/>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button form={formId}
                                type="submit"
                                className="modal-action modal-close waves-effect waves-green btn-flat ">
                            Подать
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
