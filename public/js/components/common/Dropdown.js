import React from 'react';

export default React.createClass({
    componentDidMount: function () {
    },
    onClick: function (event) {
        $.ajax({
            method: 'POST',
            data: $(event.target).serialize(),
            url: '/api-referee/add-referee',
            success: (data) => {
                Materialize.toast("Операция прошла успешно", 2000);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR,textStatus,errorThrown);
                Materialize.toast("Что то не так", 2000);
            }
        })
    },
    render: function () {
        var list = this.props.list.map((item) => {
            return (
                <li><a href="#!one" id={item._id}>{item.name}</a></li>
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