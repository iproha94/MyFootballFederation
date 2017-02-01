import React from 'react';
import ReactDOM from 'react-dom';
var horsey = require("horsey");

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
                    data: {term: data.input},
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
                    idSend: this.props.federationId
                },
                url: "/api/account/add-creator/",
                success: (data) => {
                    $(ReactDOM.findDOMNode(this.refs.form))[0].reset();
                    Materialize.toast(data.message || "Операция прошла успешно", 2000);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(jqXHR, textStatus, errorThrown);
                    Materialize.toast("Что то не так", 2000);
                }
            });
        }
    },
    render: function () {
        return (
                <div className="row">
                    <form className="col s12"
                          onSubmit={this.onSubmit}
                          ref="form">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="last_name"
                                       type="text"
                                       ref="input"
                                       required
                                       className="validate" />
                                    <label for="last_name">Добавить организатора</label>
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
                </div>
        );
    }
});