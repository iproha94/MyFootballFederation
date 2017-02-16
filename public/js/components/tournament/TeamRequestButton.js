import React from 'react';

export default React.createClass({
    componentDidMount: function(){
        $('.modal-trigger').leanModal();
    },
    render: function () {
        return <a className="right banner-button__float modal-trigger waves-effect waves-light btn"
                  href="#modal-team-request">Подать заявку на участие</a>
    }
});
