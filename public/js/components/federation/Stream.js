import React from 'react';
var front = require("../../../../cfg/front");


export default React.createClass({
    componentWillReceiveProps: function(nextProps) {
        var src;
        if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
            src = `http://${front.ip}:${front.hlsPort}/hls/${nextProps.channel}.m3u8`;
        } else {
            src = `rtmp://${front.ip}:${front.rtmpPort}/mytv/${nextProps.channel}`;
        }

        var playerInstance = jwplayer("myElement");
        playerInstance.setup({
            file: src
        });
    },
    render: function () {
        return (
            <div id="myElement" ></div>
        );
    }
});
