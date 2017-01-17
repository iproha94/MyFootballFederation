import React from 'react';
var port = require("../../../../cfg/front").streamPort;


export default React.createClass({
    componentWillReceiveProps: function(nextProps) {
        var playerInstance = jwplayer("myElement");
        playerInstance.setup({
            file: `http://185.143.172.172:${streamPort}/hls/${nextProps.channel}.m3u8`
        });
    },
    render: function () {
        return (
            <div className="container content-flex">
                <p>Идентификатор канала: {this.props.channel}</p>
                <div id="myElement" ></div>
            </div>
        );
    }
});
