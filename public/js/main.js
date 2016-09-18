(function () {
    var $input = $('input.autocomplete');
    $(document).ready(function () {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js";
        document.body.appendChild(script);

        script.onload = function () {
            $('input.autocomplete').autocomplete({
                source: location.pathname,
                method: "POST"
            });
        };
    });
})();

