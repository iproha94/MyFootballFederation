export default React.createClass({
    render: function () {
        var options = this.props.options.map(function (item) {
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