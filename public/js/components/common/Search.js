import React from 'react';

export default React.createClass({
    componentDidMount: function () {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js";
        document.body.appendChild(script);
        var self = this;
        script.onload = function () {
            $('.js-form-search').submit(function (event) {
                event.preventDefault();
            });
            $('input.autocomplete').autocomplete({
                source: '/api/',
                method: "POST",
                select: function (event, ui) {
                    self.props.history.push(self.props.url + ui.item.value);
                },
                open: function (event, ui) {
                    $(".ui-menu-item-wrapper").replaceWith(function(index, oldHTML){
                        return $("<a>").html(oldHTML)
                            .addClass("collection-item ui-menu-item-wrapper green-text text-darken-1");
                    });
                    $(".ui-autocomplete:visible").css({top:"+=5"});
                },
                create: function(event, ui) {
                    $(".ui-autocomplete").addClass("collection z-depth-1");
                }
            });
        };
    },
    render: function () {
        return (
            <form className="js-form-search">
                <div className="input-field">
                    <input id="search" type="search" className="autocomplete" autocomplete="off" required/>
                    <label for="search"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                </div>
            </form>
        );
    }
});

