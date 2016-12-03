import React from 'react';

export default React.createClass({
    componentDidMount: function() {
        var script = document.createElement('script');
        script.src = "https://vk.com/js/api/openapi.js?136";
        document.body.appendChild(script);

        script.onload = function() {
            VK.init({
                apiId: 5630102,
                onlyWidgets: true
            });
            VK.Widgets.Comments("vk_comments", {autoPublish: 0});
        }
    },
    render: function () {
        return (
            <div className="card vk-chat">
                <div id="vk_comments"></div>
            </div>
        )
    }
});


