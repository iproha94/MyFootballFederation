import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainActions from '../actions/main';

var Component = React.createClass({
    componentDidMount: function() {
        this.props.mainActions.getDatabase(this.props.currentUser._id);
    },

    render: function () {
        let getScoreTeam = function (events, idTeam) {
            let score = 0;

            events.forEach(function (event) {
                if (idTeam == event.idTeam && event.idEvent == "GOAL") score++;
                if (idTeam != event.idTeam && event.idEvent == "OWN_GOAL") score++;
            });

            return score;
        };

        var federations = this.props.database.map(function(federation) {
            var tournaments = federation.tournaments.map(function(tournament) {
                var matches = tournament.matches.map(function(match){
                    return (
                    <p key={match._id}>
                        <Link to={`/match/${match._id}`}>
                            {match.name} &nbsp;
                        </Link>
                        {match.status != "CREATED" ? getScoreTeam(match.events, match.team1) + ":" + getScoreTeam(match.events, match.team2) : "не начался"} &nbsp;
                        {match.status == "FINISHED" ? "окончен" : "" }
                        <span className="livetable_score__online">{match.status == "RUNNING" ? "идет!" : "" } </span>
                    </p>
                    )
                });

                let half = matches.length % 2 ? matches.length / 2 + 1 : matches.length / 2;
                return (
                    <div className="card livetable_match interesting-matches_matches__padding row">
                        <Link to={`/tournament/${tournament._id}`}>
                            <h5>{tournament.name}</h5>
                        </Link>
                        <div className="col s12 m12 l6">
                            {matches.length == 0 ? "матчей нет" : ""}
                            {matches.slice(0, half)}
                        </div>
                        <div className="col s12 m12 l6 interesting-matches_col__margin-top">
                            {matches.slice(half, matches.length)}
                        </div>
                    </div>
                );
            });

            return (
                <div className="card interesting-matches interesting-matches_tournament__padding">
                    <Link to={`/federation/${federation.name}`}>
                        <h4>{federation.name}</h4>
                    </Link>
                    {tournaments}
                </div>
            );
        });

        return (
            <div >
                {!federations.length && !this.props.currentUser._id ? "У вас есть возможность создать первую федерацию на этой платформе" : ""}
                {federations.length ? federations : ""}
                {!federations.length && this.props.currentUser._id ? "Подписывайтесь на федерации, чтобы увидеть здесь результаты матчей" : ""}
            </div>
        );
   } 
});


export default connect((state)=>{
    return {
        database: state.main,
        currentUser: state.currentUser
    }
}, (dispatch)=>{
    return {
        mainActions: bindActionCreators(mainActions, dispatch)
    }
})(Component);