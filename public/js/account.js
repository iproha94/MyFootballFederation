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
