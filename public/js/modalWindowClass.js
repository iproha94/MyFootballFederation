export default React.createClass({
    render: function () {
        return (
            <div>
                <a className="modal-trigger waves-effect waves-light btn"
                   href="#modal1">this.props.header</a>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>this.props.inputName</h4>
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