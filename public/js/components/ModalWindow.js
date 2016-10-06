import ModalForm from './ModalForm';

export default React.createClass({
    onClickModal: function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/team/get-team/',
            success: function(data){
                ReactDOM.render(
                    <ModalForm options={data}/>,
                    document.getElementsByClassName("js-modal-body")[0]
                );
                $('select').material_select();
                console.log(data);
            },
            error: function () {
                Materialize.toast("Что то не так", 2000);
            }
        });
    },
    onClickModalAction: function(event) {
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
    },
    componentDidMount: function () {
        $('.modal-trigger').leanModal();
    },
    render: function () {
        return (
            <div>
                <a onClick={this.onClickModal} className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">{this.props.header}</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.inputName}</h4>
                        <p className="js-modal-body"/>
                    </div>

                    <div className="modal-footer">
                        <a href="#!" onClick={this.onClickModalAction} className="modal-action modal-close waves-effect waves-green btn-flat ">Добавить</a>
                    </div>
                </div>
            </div>
        );
    }
});
