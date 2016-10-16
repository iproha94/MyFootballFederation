import React from 'react';

export default React.createClass({
    componentDidMount: function () {
        $(".js-type-tournament").change(function () {
            // {{#each config}}
            // if ($("#{{type}}").is(':checked')) {
            //     $('.config-tournament').html('конфиг турнира {{name}}');
            // }
            // {{/each}}
        });
    },
    handleSubmit: function (event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(".js-form").serialize(),
            url: "/api" + location.pathname + location.search,
            success: (data) => {
                Materialize.toast("Операция прошла успешно", 2000);
                this.props.history.push('/tournament/' + data._id);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        // var a = (
        //     {{#each config}}
        //     <p>
        //         <input className='js-type-tournament' name="group1" type="radio" id="{{type}}"/>
        //         <label for={{type}}>{{name}}</label>
        //     </p>
        //     {{/each}}
        // );
        return (
            <div className="container content-margin-top content-flex">
                <div className="row">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input id="name" type="text" className="validate" name="name" required pattern="[a-zA-Z][a-zA-Z0-9\s]*"/>
                                <label for="name">Название турнира</label>
                        </div>

                        <div className="input-field">
                            <input id="time" type="text" className="validate" value="7" name="countPlayersOnField" required pattern="[0-9]*"/>
                                <label for="time">Колличество игроков на поле от команды</label>
                        </div>

                        <div className="input-field">
                            <input id="time" type="text" className="validate" value="16" name="countPlayersInTeam" required pattern="[0-9]*"/>
                                <label for="time">Колличество заявленных игроков в команде</label>
                        </div>

                        <div className="input-field">
                            <input id="time" type="text" className="validate" value="25" name="timePeriod" required pattern="[0-9]*"/>
                                <label for="time">Длительность периода [мин]</label>
                        </div>

                        <div className="input-field">
                            <input id="countPeriods" type="text" value="2" className="validate" name="countPeriods" required pattern="[0-9]*"/>
                                <label for="countPeriods">Количество периодов</label>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
});