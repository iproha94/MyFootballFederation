import React from 'react';
import Federations from '../components/account/fedetations';
import Teams from '../components/account/teams';

export default React.createClass({
    componentDidMounting: function () {
        $(document).ready(function(){
            var $modal = $('.modal-trigger');
            $modal.leanModal();

            var templateString = $('.modal-template').html();
            var template = Handlebars.compile(templateString);

            $modal.click(function(event){
                event.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: '/account/get-creator/',
                    success: function(data){
                        $('.js-modal-body').html(template(data));
                        $('select').material_select();
                        $modal.unbind(event);
                    },
                    error: function () {
                        Materialize.toast("Что то не так", 2000);
                    }
                });
            });

            $(".modal-action").click(function(event) {
                $.ajax({
                    type: 'POST',
                    data: $(".js-add-creator-form").serialize(),
                    url: '/account/add-creator/',
                    success: function(data){
                        Materialize.toast("Пользователь успешно добавлен", 2000);
                    },
                    error: function () {
                        Materialize.toast("Что то не так", 2000);
                    }
                });
            });
        });
    },
    render: function () {
        var pageUser = this.props.pageUser;
        var user = this.props.user;
        return (
            <div>
                <div className="container content-margin-top content-flex">
                    <div className="center">
                        <h3>Страница пользователя</h3>
                        <h4>{pageUser ? "Имя пользователя:"+{pageUser.name}:
                            "Ваше имя:" {user.name}
                        </h4>
                        <h5>Поздравляем с регистрацией</h5>
                    </div>
                </div>
            </div>
        )     
    }
});
        
   