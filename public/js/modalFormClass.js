var ModalForm = React.createClass({
    render: function () {
        return (
            <div>
                <form className="js-modal-form">
                    <input type="hidden" name="idTournament" value="{{tournament._id}}"/>
                        <div className="input-field col s12">
                            <select name="idTeam">
                                <option value="{this.props._id}">{this.props.name}</option>
                            </select>
                        </div>
                </form>
            </div>
        );
    }
});