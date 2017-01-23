import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
    sendTeamBanner: function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            contentType: 'multipart/form-data',
            data:$(ReactDOM.findDOMNode(this.refs.form)).serialize(),
            url: "/api/team/add-banner",
            success: (data) => {
                $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                Materialize.toast(data.message || "Операция прошла успешно", 2000);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR, textStatus, errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    render: function () {
        return (
            <div>
                <h4>Баннер: </h4>
                <form ref="form"
                      method="post"
                      onSubmit={this.handleSubmit}>

                    <input name="team" value={this.props.team._id} type="hidden"/>

                    <input type="file"
                           className="form-control"
                           required
                           accept="image/*"
                           id="fieldPhoto"
                           name="banner" />

                    <input type="submit" value="Upload" onClick={this.sendTeamBanner}/>
                </form>

            </div>
        );
    }
});