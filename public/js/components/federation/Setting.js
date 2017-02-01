import React from 'react';
import ReactDOM from 'react-dom';
import AdminAdd from './AdminAdd';

export default React.createClass({
    sendBanner: function(event) {
        event.preventDefault();
        var form = ReactDOM.findDOMNode(this.refs.form);
        var formData = new FormData(form);
        $.ajax({
            method: 'POST',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            url: "/api/federation/add-banner",
            success: (data) => {
                $(form)[0].reset();
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
                <form ref="form"
                      className="col s12"
                      onSubmit={this.sendBanner}>

                    <input name="federation" value={this.props.federationId} type="hidden"/>

                    <div className="row">
                        <div className="file-field input-field col s12">
                            <div className="btn">
                                <span>Баннер</span>
                                <input type="file"
                                       className="form-control"
                                       accept="image/*"
                                       id="fieldPhoto"
                                       name="banner" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" name="img-name"/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 right-align">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Отправить
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>


                <AdminAdd federationId={this.props.federationId}/>

            </div>
        );
    }
});