(function () {
    var $input = $('input.autocomplete');
    $(document).ready(function () {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js";
        document.body.appendChild(script);

        script.onload = function () {
            $('.js-form-search').submit(function (event) {
                event.preventDefault();
            });
            $('input.autocomplete').autocomplete({
                source: location.pathname,
                method: "POST",
                select: function (event, ui) {
                    window.location = '/federation/' + ui.item.value;
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
    });
})();

