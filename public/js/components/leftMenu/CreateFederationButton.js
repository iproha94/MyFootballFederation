import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    render: function () {
        return <a id="create-federation-btn" className="modal-trigger waves-effect waves-light btn width-fullscreen"
                 href="#modal-federation">Создать</a>
    }
});
