import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    handleSubmit: function(event) {
        event.preventDefault();
        $.ajax({
            data: $(".js-modal-form").serialize(),
            url: "/api/tournament/add-team",
            success: (data) => {
                console.log(data);
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
                this.props.teamActions.getTeamsByTournament(this.props.tournamentId);
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
    onChange: function () {
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
                <a onClick={this.onClickStart} className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">Подать заявку на участие</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Выберите команду</h4>
                        <div>
                            <form className="js-modal-form"
                                  id="form-add-team"
                                  onSubmit={this.handleSubmit}
                                  onChange={this.onChange}>
                                <input type="hidden" name="idTournament" value={this.props.tournamentId}/>
                                <div className="input-field col s12">
                                    <select name="idSend">
                                        {options}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button form="form-add-team"
                                type="submit"
                                className="modal-action modal-close waves-effect waves-green btn-flat ">Отправить заявку</button>
                    </div>
                </div>
            </div>
        );
    }
});
