var horsey = require("horsey");
import ReactDOM from 'react-dom';

export default {
    componentDidMount: function () {
        var self = this;
        var input = ReactDOM.findDOMNode(this.refs.input);
        horsey(input, {
            noMatches: "Ничего не найдено",
            source (data, done) {
                $.ajax({
                    url: '/api/',
                    data: {term: data.input},
                    success: (dataServer) => {
                        done(null, [{
                            list: dataServer
                        }])
                    }
                });

                var padding = 56;
                $(".sey-container")
                    .addClass("collection z-depth-1")
                    .width($(input).width() + padding);
            },
            renderItem: function (li, suggestion) {
                li.innerHTML = `<a class="collection-item ui-menu-item-wrapper green-text text-darken-1">
                                ${suggestion}
                                </a>`;
                $(li).click(function (e) {
                    self.props.history.push(self.props.url + suggestion);
                    $(li).off("click");
                });
            }
        });
    },
    resetForm: function () {
        var form = ReactDOM.findDOMNode(this.refs.form);
        form.reset();
    }
};