import React from 'react';

export default React.createClass({
    handleSubmit: function (event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(".js-form").serialize(),
            url: "/api" + location.pathname + location.search,
            success: (data) => {
                Materialize.toast("Операция прошла успешно", 2000);
                this.props.history.push('/stage/' + data._id);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        return (
            <div className="container content-margin-top content-flex">
                <div className="row">
                    <form className="js-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input id="name" type="text" className="validate" name="name" required pattern="[a-zA-Z][a-zA-Z0-9\s]*" />
                                <label for="name">Название этапа</label>
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