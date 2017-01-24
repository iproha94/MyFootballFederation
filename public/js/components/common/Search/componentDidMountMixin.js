export default {
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
                    ui.item.value = '';
                    event.target.blur();
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

            var script = document.createElement("script");
            script.src = "/js/lib/materialize.js";
            document.body.appendChild(script);
        };
    }
};