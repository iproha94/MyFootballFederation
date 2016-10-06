export default React.createClass({
    getInitialState: function() {
        return {
            teams: [],
            tournament: this.props.tournament
        };
    },
    onClick: function () {
        this.componentDidMount();
    },
    componentDidMount: function () {
        console.log(this.props);
        var source = "/team/get-team-by-tournament/" + this.props.tournament._id;
        this.serverRequest = $.post(source, function (result) {
            console.log(result); 
            this.setState({
                teams: result
            });
        }.bind(this));
    },
    render: function () {
        this.setState({
            tournament: this.props.tournament
        });
        var teams = this.state.teams.map(function (item) {
            return (
                <a href={"/team/" + item._id} className="collection-item">{item.name}</a>
            )
        });
        
        return (
            <div onClick={this.props.setTournament} className="row">
                <div className="tournament-list_header">
                    Список команд:
                </div>
                <div className="collection">
                    {teams}
                </div>
            </div>
        )
    }
});