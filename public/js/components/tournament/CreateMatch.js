import React from 'react';
import ReactDOM from 'react-dom';

//teams
//idStage
//addMatchesInStage

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
        for(var team of form.elements["teams[]"]) {
            if(team.checked) {
                countTeam++;
            }
        }

        return countTeam > 1;
    },
    handleSubmit: function(event) {
        event.preventDefault();

        var form = ReactDOM.findDOMNode(this.refs.form);
        if(!this.validationForm(form)) {
            Materialize.toast("Выберете несколько команд", 2000);
            return;
        }

        $.ajax({
            method: 'POST',
            data: $(form).serialize(),
            url: `/api/match/create/`,
            success: (data) => {
                $(form)[0].reset();
                Materialize.updateTextFields();
                Materialize.toast(data.message || "Матчи успешно созданы", 2000);
                this.props.addMatchesInStage(this.props.idStage, data.matches);
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
                <div>
                    <input type='checkbox' defaultChecked={false} ref={"team"+item._id} name="teams[]" value={item._id}/>
                    <label for={"team"+item._id} onClick={this.handleChange} data-ref={"team"+item._id}>{item.name}</label>
                </div>
            );
        });

        var modalId = `modal-team-stage-${this.props.idStage}`;
        var formId = `form-create-team-${this.props.idStage}`;
        return (
            <div>
                <div id={modalId} key={modalId} className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Создание матчей</h4>
                        <div className="row">
                            <form className="col s12 create__padding"
                                  ref='form'
                                  id={formId}
                                  onSubmit={this.handleSubmit}>
                                <div className="teams-select-header">Выберете команды:</div>
                                {teams}
                                <input type="hidden" name="idStage" value={this.props.idStage}/>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button form={formId}
                                type="submit"
                                className="modal-action modal-close waves-effect waves-green btn-flat ">
                            Создать
                        </button>
                    </div>
                </div>

                <div className="match-create-button">
                    <a className="right modal-trigger btn-floating btn-large waves-effect waves-light red"
                       href={`#${modalId}`}>
                        <i className="material-icons">add</i>
                    </a>
                </div>
            </div>
        );
    }
});