import React from 'react';

export default React.createClass({
    componentWillReceiveProps: function(nextProps) {
        var playerInstance = jwplayer("myElement");
        playerInstance.setup({
            file: `http://192.168.0.38:8078/hls/${nextProps.channel}.m3u8`
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
