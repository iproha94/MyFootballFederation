$(document).ready(function(){
    var $modal = $('.modal-trigger');
    $modal.leanModal();

    var templateString = $('.modal-template').html();
    var template = Handlebars.compile(templateString);

    $modal.click(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/team/get-team/',
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
            data: $(".js-modal-form").serialize(),
            url: 'add-team/',
            success: function(data){
                if (data.status == 200) {
                    Materialize.toast("Команда успешно добавлена", 2000);
                } else if (data.status == 403){
                    Materialize.toast("Команда уже есть", 2000);
                }
            },
            error: function () {
                Materialize.toast("Что то не так", 2000);
            }
        });
    });
});
