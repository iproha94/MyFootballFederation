import React from 'react';
import ReactDOM from 'react-dom';
var horsey = require("horsey");

//api:
//url - куда отправлять данные
//nameSendField - имя поля которое будет отправлено
//sendField - значения поля которое будет отправлено
//inputLabel - placeholder для input

export default React.createClass({
    getInitialState: function() {
        return {idUser: null};
    },
    selectIdUser: function(idUser) {
        this.setState({idUser: idUser});
    },
    componentDidMount: function () {
        var input = ReactDOM.findDOMNode(this.refs.input);
        var self = this;
        horsey(input, {
            noMatches: "Ничего не найдено",
            source (data, done) {
                $.ajax({
                    url: '/api/get-user-list-by-regexp',
                    data: {
                        term: data.input,
                        isAddCurrentUser: self.props.isAddCurrentUser
                    },
                    success: (dataServer) => {
                        console.log(dataServer);
                        done(null, [{
                            list: dataServer
                        }])
                    }
                });

                $(".sey-container")
                    .addClass("collection z-depth-1")
                    .width($(input).width());
            },
            getText: 'name',
            getValue: '_id',
            filter: function (query, suggestion) {
                return true;
            },
            renderItem: function (li, suggestion) {
                console.log(suggestion);
                li.innerHTML = `<a class="collection-item ui-menu-item-wrapper green-text text-darken-1">
                                ${suggestion.name}
                                </a>`;
                $(li).click(function (e) {
                    self.selectIdUser(suggestion._id);
                    $(li).off("click");
                });
            }
        });
    },
    onSubmit: function(event) {
        event.preventDefault();
        if(this.state.idUser) {
            $.ajax({
                data: {
                    idUser: this.state.idUser,
                    [this.props.nameSendField]: this.props.sendField
                },
                url: this.props.url,
                success: (data) => {
                    $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                    Materialize.updateTextFields();
                    Materialize.toast(data.message || "Операция прошла успешно", 2000);
                    if(this.props.actionSuccess){
                        this.props.actionSuccess();
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(jqXHR, textStatus, errorThrown);
                    Materialize.toast("Что то не так", 2000);
                    if(this.props.actionError){
                        this.props.actionError();
                    }
                }
            });
        }
    },
    render: function () {
        return (
            <form className={`col s12 ${this.props.isCard ? "card" : ""}`}
                  onSubmit={this.onSubmit}
                  ref="form">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="last_name"
                               type="text"
                               ref="input"
                               required
                               className="validate" />
                        <label for="last_name">{this.props.inputLabel}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 right-align">
                        <button className="btn waves-effect waves-light" type="submit" name="action">Добавить
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});