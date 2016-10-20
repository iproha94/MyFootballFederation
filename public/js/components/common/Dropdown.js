import React from 'react';

export default React.createClass({
    componentDidMount: function () {
    },
    onClick: function (event) {

    },
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <li><a href="#!one" id={item.name}>{item.name}</a></li>
            )
        });
        return (
            <div>
                <!-- Dropdown Trigger -->
                <a className='dropdown-button btn' href='#' data-activates='dropdown'>Drop Me!</a>

                <!-- Dropdown Structure -->
                <ul id='dropdown' className='dropdown-content'>
                    {list} 
                </ul>
            </div>
        )
    }
});