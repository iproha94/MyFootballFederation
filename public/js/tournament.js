/* jshint ignore:start */
var ModalForm = React.createClass({
    render: function () {
        var options = this.props.options.map(function (item) {
            console.log("sdf");
            return (
                <option value={item._id}>
                    {item.name}
                </option>
            )
        });

        return (
            <div>
                <form className="js-modal-form">
                    <input type="hidden" name="idTournament" value="{{tournament._id}}"/>
                    <div className="input-field col s12">
                        <select name="idTeam">
                            {options}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
});

var ModalWindow = React.createClass({
    render: function () {
        return (
            <div>
                <a className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.header}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.inputName}</h4>
                        <p className="js-modal-body"/>
                    </div>

                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
                </div>
            </div>
        );
    }
});

$(document).ready(function(){
    ReactDOM.render(
        <ModalWindow name="hello react"
                     header="Подать заявку"
                     inputName="Выберете один из варинтов"/>,
        document.getElementById("model-place")
    );
    var $modal = $('.modal-trigger');
    $modal.leanModal();
    
    $modal.click(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/team/get-team/',
            success: function(data){
                ReactDOM.render(
                    <ModalForm options={data}
                               header="asdfasdf"
                               inputName="dfsdf"/>,
                    document.getElementsByClassName("js-modal-body")[0]
                );
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
                Materialize.toast("Команда успешно добавлена", 2000);
            },
            error: function () {
                Materialize.toast("Что то не так", 2000);
            }
        });
    });
});
/* jshint ignore:end */