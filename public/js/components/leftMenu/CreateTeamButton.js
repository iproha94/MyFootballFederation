import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    render: function () {
        return <a id="create-team-btn" className="modal-trigger waves-effect waves-light btn width-fullscreen"
                    href="#modal-team">Создать</a>
    }
});
