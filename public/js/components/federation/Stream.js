import React from 'react';

export default React.createClass({
    render: function () {
        var federation = this.props.federation;
        return (
            <div className="container content-flex">
                <object width="560" height="400">
                    <param name="movie" value="http://hosting-marketers.com/strobe/StrobeMediaPlayback.swf" />
                    <param name="flashvars" value="streamType=liveOrRecorded&autoPlay=true&scaleMode=letterbox&loop=true&backgroundColor=000000&optimizeBuffering=true&initialBufferTime=0.1&expandedBufferTime=10&minContinuousPlaybackTime=30&src=rtmp://185.143.172.172:1935/mytv/stream" />
                    <param name="allowFullScreen" value="true" />
                    <param name="allowscriptaccess" value="always" />
                    <embed src="http://hosting-marketers.com/strobe/StrobeMediaPlayback.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true"  width="560" height="400" flashvars="streamType=liveOrRecorded&autoPlay=true&scaleMode=letterbox&loop=true&backgroundColor=000000&optimizeBuffering=true&initialBufferTime=0.1&expandedBufferTime=10&minContinuousPlaybackTime=30&src=rtmp://185.143.172.172:1935/mytv/stream" />
                </object>
            </div>
        );
    }
});
